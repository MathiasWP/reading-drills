import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { TextPassage } from "./texts";

interface AppDB extends DBSchema {
  preferences: {
    key: string;
    value: {
      id: string;
      value: unknown;
    };
  };
  sessions: {
    key: number;
    value: {
      id?: number;
      exercise: string;
      wpm: number;
      duration: number; // seconds
      date: string; // ISO string
    };
    indexes: {
      "by-exercise": string;
      "by-date": string;
    };
  };
  customTexts: {
    key: string;
    value: TextPassage;
    indexes: {
      "by-source": string;
      "by-bookId": string;
    };
  };
  books: {
    key: string;
    value: {
      id: string;
      title: string;
      author?: string;
      coverDataUrl?: string;
      chapterCount: number;
      totalPages: number;
      dateAdded: string;
      progress: { chapterIndex: number; pageIndex: number };
    };
  };
}

let dbPromise: Promise<IDBPDatabase<AppDB>> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<AppDB>("reading-drills", 1, {
      upgrade(db) {
        db.createObjectStore("preferences", { keyPath: "id" });
        const sessions = db.createObjectStore("sessions", {
          keyPath: "id",
          autoIncrement: true,
        });
        sessions.createIndex("by-exercise", "exercise");
        sessions.createIndex("by-date", "date");
        const customTexts = db.createObjectStore("customTexts", {
          keyPath: "id",
        });
        customTexts.createIndex("by-source", "source");
        customTexts.createIndex("by-bookId", "bookId");
        db.createObjectStore("books", { keyPath: "id" });
      },
    });
  }
  return dbPromise;
}

// --- Preferences ---

export async function getPref<T>(key: string, fallback: T): Promise<T> {
  try {
    const db = await getDB();
    const result = await db.get("preferences", key);
    return result ? (result.value as T) : fallback;
  } catch {
    return fallback;
  }
}

export async function setPref(key: string, value: unknown): Promise<void> {
  try {
    const db = await getDB();
    await db.put("preferences", { id: key, value });
  } catch {
    // Silently fail - preferences are non-critical
  }
}

// --- Sessions ---

export async function saveSession(session: {
  exercise: string;
  wpm: number;
  duration: number;
}): Promise<void> {
  try {
    const db = await getDB();
    await db.add("sessions", {
      ...session,
      date: new Date().toISOString(),
    });
  } catch {
    // Silently fail
  }
}

export async function getBestWPM(exercise: string): Promise<number> {
  try {
    const db = await getDB();
    const all = await db.getAllFromIndex("sessions", "by-exercise", exercise);
    if (all.length === 0) return 0;
    return Math.max(...all.map((s) => s.wpm));
  } catch {
    return 0;
  }
}

export async function getRecentSessions(
  limit = 10
): Promise<AppDB["sessions"]["value"][]> {
  try {
    const db = await getDB();
    const all = await db.getAll("sessions");
    return all.sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
  } catch {
    return [];
  }
}

// --- Custom Texts ---

export async function getCustomTexts(): Promise<TextPassage[]> {
  try {
    const db = await getDB();
    return await db.getAll("customTexts");
  } catch {
    return [];
  }
}

export async function addCustomText(passage: TextPassage): Promise<void> {
  try {
    const db = await getDB();
    await db.put("customTexts", passage);
  } catch {
    // Silently fail
  }
}

export async function deleteCustomText(id: string): Promise<void> {
  try {
    const db = await getDB();
    await db.delete("customTexts", id);
  } catch {
    // Silently fail
  }
}

export async function getCustomTextsByBook(
  bookId: string
): Promise<TextPassage[]> {
  try {
    const db = await getDB();
    return await db.getAllFromIndex("customTexts", "by-bookId", bookId);
  } catch {
    return [];
  }
}

// --- Books ---

export type BookRecord = AppDB["books"]["value"];

export async function getBooks(): Promise<BookRecord[]> {
  try {
    const db = await getDB();
    return await db.getAll("books");
  } catch {
    return [];
  }
}

export async function getBook(id: string): Promise<BookRecord | undefined> {
  try {
    const db = await getDB();
    return await db.get("books", id);
  } catch {
    return undefined;
  }
}

export async function addBook(book: BookRecord): Promise<void> {
  try {
    const db = await getDB();
    await db.put("books", book);
  } catch {
    // Silently fail
  }
}

export async function updateBookProgress(
  id: string,
  progress: { chapterIndex: number; pageIndex: number }
): Promise<void> {
  try {
    const db = await getDB();
    const book = await db.get("books", id);
    if (book) {
      book.progress = progress;
      await db.put("books", book);
    }
  } catch {
    // Silently fail
  }
}

export async function deleteBook(id: string): Promise<void> {
  try {
    const db = await getDB();
    await db.delete("books", id);
    // Also delete all chapters for this book
    const chapters = await db.getAllFromIndex("customTexts", "by-bookId", id);
    const tx = db.transaction("customTexts", "readwrite");
    for (const chapter of chapters) {
      tx.store.delete(chapter.id);
    }
    await tx.done;
  } catch {
    // Silently fail
  }
}
