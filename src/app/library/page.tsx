"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useActivePassage } from "@/components/ActivePassageProvider";
import {
  getCategories,
  categoryLabels,
  difficultyLabels,
  type TextCategory,
  type TextPassage,
} from "@/lib/texts";
import {
  addCustomText,
  deleteCustomText,
  getBooks,
  addBook,
  deleteBook,
  updateBookProgress,
  getCustomTextsByBook,
  type BookRecord,
} from "@/lib/db";
import { parseEpub } from "@/lib/epub";
import { getTotalPages, getChapterPageCount } from "@/lib/pages";

type DifficultyFilter = "all" | TextPassage["difficulty"];
type SourceFilter = "all" | "builtin" | "custom";

export default function LibraryPage() {
  return (
    <Suspense>
      <LibraryContent />
    </Suspense>
  );
}

function LibraryContent() {
  const { passage: activePassage, setPassage, allPassages, refreshPassages } =
    useActivePassage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const returnTo = searchParams.get("from");
  const [categoryFilter, setCategoryFilter] = useState<TextCategory | "all">(
    "all"
  );
  const [difficultyFilter, setDifficultyFilter] =
    useState<DifficultyFilter>("all");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");
  const [showPasteForm, setShowPasteForm] = useState(false);
  const [pasteTitle, setPasteTitle] = useState("");
  const [pasteText, setPasteText] = useState("");
  const [pasteDifficulty, setPasteDifficulty] =
    useState<TextPassage["difficulty"]>("medium");
  const [books, setBooks] = useState<BookRecord[]>([]);
  const [expandedBook, setExpandedBook] = useState<string | null>(null);
  const [bookChapters, setBookChapters] = useState<
    Record<string, TextPassage[]>
  >({});
  const [importing, setImporting] = useState(false);
  const [expandedChapterIdx, setExpandedChapterIdx] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");
  const [editDifficulty, setEditDifficulty] =
    useState<TextPassage["difficulty"]>("medium");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = getCategories();

  // Load books on mount
  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  const hasCustomTexts = allPassages.some(
    (p) => p.source === "custom" || p.source === "epub"
  );

  // Filter out epub chapters from the main grid (they show under books)
  const filtered = useMemo(() => {
    return allPassages
      .filter((p) => p.source !== "epub")
      .filter((p) => {
        if (
          sourceFilter === "custom" &&
          p.source !== "custom"
        )
          return false;
        if (
          sourceFilter === "builtin" &&
          p.source === "custom"
        )
          return false;
        if (categoryFilter !== "all" && p.category !== categoryFilter)
          return false;
        if (difficultyFilter !== "all" && p.difficulty !== difficultyFilter)
          return false;
        return true;
      });
  }, [allPassages, categoryFilter, difficultyFilter, sourceFilter]);

  const difficultyColor: Record<TextPassage["difficulty"], string> = {
    easy: "bg-green-500",
    medium: "bg-amber-500",
    hard: "bg-red-500",
  };

  const handleSaveCustomText = async () => {
    const trimmedTitle = pasteTitle.trim();
    const trimmedText = pasteText.trim();
    if (!trimmedTitle || !trimmedText) return;

    const words = trimmedText.split(/\s+/);
    const passage: TextPassage = {
      id: `custom-${Date.now()}`,
      title: trimmedTitle,
      difficulty: pasteDifficulty,
      category: "society",
      text: trimmedText,
      wordCount: words.length,
      source: "custom",
    };

    await addCustomText(passage);
    await refreshPassages();
    setShowPasteForm(false);
    setPasteTitle("");
    setPasteText("");
    setPasteDifficulty("medium");
  };

  const handleStartEdit = (p: TextPassage) => {
    setEditingId(p.id);
    setEditTitle(p.title);
    setEditText(p.text);
    setEditDifficulty(p.difficulty);
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editTitle.trim() || !editText.trim()) return;
    const words = editText.trim().split(/\s+/);
    const updated: TextPassage = {
      id: editingId,
      title: editTitle.trim(),
      difficulty: editDifficulty,
      category: "society",
      text: editText.trim(),
      wordCount: words.length,
      source: "custom",
    };
    await addCustomText(updated);
    await refreshPassages();
    if (activePassage?.id === editingId) {
      setPassage(updated);
    }
    setEditingId(null);
  };

  const handleDeleteCustomText = async (id: string) => {
    await deleteCustomText(id);
    if (activePassage?.id === id) {
      const fallback = allPassages.find(
        (p) => p.id !== id && p.source !== "epub"
      );
      if (fallback) setPassage(fallback);
    }
    await refreshPassages();
  };

  const handleImportEpub = async (file: File) => {
    setImporting(true);
    try {
      const epub = await parseEpub(file);
      const bookId = `book-${Date.now()}`;

      // Store each chapter as a custom text
      for (let i = 0; i < epub.chapters.length; i++) {
        const ch = epub.chapters[i];
        const words = ch.text.split(/\s+/).filter(Boolean);
        await addCustomText({
          id: `${bookId}-ch-${i}`,
          title: ch.title,
          difficulty: "medium",
          category: "fiction",
          text: ch.text,
          wordCount: words.length,
          source: "epub",
          bookId,
          chapterIndex: i,
        });
      }

      // Store book record
      const totalPages = getTotalPages(epub.chapters);
      await addBook({
        id: bookId,
        title: epub.title,
        author: epub.author,
        coverDataUrl: epub.coverDataUrl,
        chapterCount: epub.chapters.length,
        totalPages,
        dateAdded: new Date().toISOString(),
        progress: { chapterIndex: 0, pageIndex: 0 },
      });

      await refreshPassages();
      const updatedBooks = await getBooks();
      setBooks(updatedBooks);
      setExpandedBook(bookId);
      await loadBookChapters(bookId);
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "Failed to import EPUB file"
      );
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    await deleteBook(bookId);
    if (activePassage?.bookId === bookId) {
      const fallback = allPassages.find(
        (p) => p.source !== "epub" || p.bookId !== bookId
      );
      if (fallback) setPassage(fallback);
    }
    await refreshPassages();
    const updatedBooks = await getBooks();
    setBooks(updatedBooks);
    setBookChapters((prev) => {
      const next = { ...prev };
      delete next[bookId];
      return next;
    });
  };

  const loadBookChapters = async (bookId: string) => {
    const chapters = await getCustomTextsByBook(bookId);
    chapters.sort((a, b) => (a.chapterIndex ?? 0) - (b.chapterIndex ?? 0));
    setBookChapters((prev) => ({ ...prev, [bookId]: chapters }));
  };

  const handleToggleBook = async (bookId: string) => {
    if (expandedBook === bookId) {
      setExpandedBook(null);
    } else {
      setExpandedBook(bookId);
      if (!bookChapters[bookId]) {
        await loadBookChapters(bookId);
      }
    }
  };

  const handleContinueReading = async (book: BookRecord) => {
    const chapters = bookChapters[book.id] || (await getCustomTextsByBook(book.id));
    const chapter = chapters.find(
      (c) => c.chapterIndex === book.progress.chapterIndex
    );
    if (chapter) {
      setPassage(chapter, book.progress.pageIndex);
      if (returnTo) router.push(returnTo);
    }
  };

  const handleSelectChapter = (chapter: TextPassage, book: BookRecord, page: number = 0) => {
    setPassage(chapter, page);
    updateBookProgress(book.id, {
      chapterIndex: chapter.chapterIndex ?? 0,
      pageIndex: page,
    });
  };

  const getBookProgress = (book: BookRecord): number => {
    if (book.totalPages === 0) return 0;
    // Approximate: sum pages of completed chapters
    const chapters = bookChapters[book.id];
    if (!chapters) return 0;
    let pagesRead = 0;
    for (let i = 0; i < book.progress.chapterIndex; i++) {
      if (chapters[i]) {
        pagesRead += getChapterPageCount(chapters[i].text);
      }
    }
    pagesRead += book.progress.pageIndex;
    return Math.min((pagesRead / book.totalPages) * 100, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-ink/10 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={returnTo || "/"}
              className="text-ink-faint hover:text-ink transition-colors"
              aria-label="Go back"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 4l-6 6 6 6" />
              </svg>
            </Link>
            <div>
              <h1 className="font-serif text-lg font-semibold">Library</h1>
              <p className="text-xs text-ink-faint hidden sm:block">
                Choose a text for your reading exercises
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Filters */}
      <div className="border-b border-ink/8 px-4 py-3">
        <div className="max-w-3xl mx-auto space-y-3">
          {/* Source filter + action buttons */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-2">
              {(
                [
                  ["all", "All"],
                  ["builtin", "Built-in"],
                  ...(hasCustomTexts
                    ? [["custom", "My Texts"] as const]
                    : []),
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSourceFilter(key as SourceFilter)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    sourceFilter === key
                      ? "bg-accent text-white"
                      : "bg-paper-dark text-ink-light hover:text-ink"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={importing}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-paper-dark text-ink-light hover:text-ink transition-colors disabled:opacity-50"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                </svg>
                {importing ? "Importing..." : "Import Epub"}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".epub"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImportEpub(file);
                }}
              />
              <button
                onClick={() => setShowPasteForm(!showPasteForm)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent text-white hover:bg-accent-hover transition-colors"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 1v10M1 6h10" />
                </svg>
                Add Text
              </button>
            </div>
          </div>

          {/* Category pills */}
          <div>
            <p className="text-[10px] text-ink-faint uppercase tracking-wide mb-1.5">Topic</p>
            <div className="flex gap-2 overflow-x-auto pb-1 subtle-scrollbar">
              <button
                onClick={() => setCategoryFilter("all")}
                className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  categoryFilter === "all"
                    ? "bg-accent text-white"
                    : "bg-paper-dark text-ink-light hover:text-ink"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    categoryFilter === cat
                      ? "bg-accent text-white"
                      : "bg-paper-dark text-ink-light hover:text-ink"
                  }`}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty toggle */}
          <div>
            <p className="text-[10px] text-ink-faint uppercase tracking-wide mb-1.5">Level</p>
            <div className="flex gap-2">
            {(["all", "easy", "medium", "hard"] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDifficultyFilter(d)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  difficultyFilter === d
                    ? "bg-accent text-white"
                    : "bg-paper-dark text-ink-light hover:text-ink"
                }`}
              >
                {d === "all" ? "All" : difficultyLabels[d]}
              </button>
            ))}
            </div>
          </div>
        </div>
      </div>

      {/* Paste form */}
      {showPasteForm && (
        <div className="border-b border-ink/8 px-4 py-4 bg-paper-dark/50">
          <div className="max-w-3xl mx-auto space-y-3">
            <h3 className="font-serif font-semibold text-sm">
              Add Your Own Text
            </h3>
            <input
              type="text"
              placeholder="Title"
              value={pasteTitle}
              onChange={(e) => setPasteTitle(e.target.value)}
              className="w-full bg-paper border border-ink/10 rounded-lg px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <textarea
              placeholder="Paste your text here..."
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              rows={6}
              className="w-full bg-paper border border-ink/10 rounded-lg px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-1 focus:ring-accent resize-y"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-ink-faint">Difficulty:</span>
                {(["easy", "medium", "hard"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setPasteDifficulty(d)}
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                      pasteDifficulty === d
                        ? "bg-accent text-white"
                        : "bg-paper-dark text-ink-light hover:text-ink"
                    }`}
                  >
                    {difficultyLabels[d]}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowPasteForm(false);
                    setPasteTitle("");
                    setPasteText("");
                  }}
                  className="px-3 py-1.5 text-xs text-ink-faint hover:text-ink transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCustomText}
                  disabled={!pasteTitle.trim() || !pasteText.trim()}
                  className="px-4 py-1.5 rounded-lg text-xs font-medium bg-accent text-white hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </div>
            </div>
            {pasteText.trim() && (
              <p className="text-[10px] text-ink-faint">
                {pasteText.trim().split(/\s+/).length} words
              </p>
            )}
          </div>
        </div>
      )}

      {/* Books section */}
      {books.length > 0 && (sourceFilter === "all" || sourceFilter === "custom") && (
        <div className="px-4 pt-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xs text-ink-faint uppercase tracking-wide font-medium mb-3">
              My Books
            </h2>
            <div className="space-y-3 mb-6">
              {books.map((book) => {
                const isExpanded = expandedBook === book.id;
                const chapters = bookChapters[book.id] ?? [];
                const progress = getBookProgress(book);
                const isBookActive = activePassage?.bookId === book.id;
                return (
                  <div
                    key={book.id}
                    className={`rounded-xl border overflow-hidden ${
                      isBookActive
                        ? "border-accent ring-2 ring-accent/30 bg-accent-soft/30"
                        : "border-ink/8 bg-paper"
                    }`}
                  >
                    {/* Book header */}
                    <button
                      onClick={() => handleToggleBook(book.id)}
                      className="w-full text-left p-4 hover:bg-paper-dark/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        {/* Cover image */}
                        {book.coverDataUrl ? (
                          <img
                            src={book.coverDataUrl}
                            alt=""
                            className="w-12 h-[4.5rem] object-cover rounded shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-[4.5rem] rounded shrink-0 bg-paper-dark flex items-center justify-center">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              className="text-ink-faint"
                            >
                              <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                            </svg>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="font-serif font-semibold text-sm">
                                {book.title}
                              </h3>
                              {book.author && (
                                <p className="text-xs text-ink-faint mt-0.5">
                                  by {book.author}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {isBookActive && (
                                <span className="text-[10px] font-medium text-accent uppercase tracking-wide">
                                  Active
                                </span>
                              )}
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              className={`shrink-0 text-ink-faint transition-transform ${isExpanded ? "rotate-180" : ""}`}
                            >
                              <path d="M3 5l4 4 4-4" />
                            </svg>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-[10px] text-ink-faint">
                              {book.chapterCount} chapters
                            </span>
                            <span className="text-[10px] text-ink-faint">
                              {book.totalPages} pages
                            </span>
                          </div>
                          {/* Progress bar */}
                          <div className="mt-2 w-full h-1 bg-paper-dark rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* Expanded chapter list */}
                    {isExpanded && (
                      <div className="border-t border-ink/8">
                        <div className="p-3 flex gap-2">
                          <button
                            onClick={() => handleContinueReading(book)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-accent text-white hover:bg-accent-hover transition-colors"
                          >
                            Select Book
                          </button>
                          <button
                            onClick={() => {
                              updateBookProgress(book.id, {
                                chapterIndex: 0,
                                pageIndex: 0,
                              });
                              const ch = chapters[0];
                              if (ch) setPassage(ch);
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-paper-dark text-ink-light hover:text-ink transition-colors"
                          >
                            Start Over
                          </button>
                          <button
                            onClick={() => handleDeleteBook(book.id)}
                            className="ml-auto px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors"
                          >
                            Delete Book
                          </button>
                        </div>
                        <div className="max-h-80 overflow-y-auto subtle-scrollbar">
                          {chapters.map((ch) => {
                            const chIdx = ch.chapterIndex ?? 0;
                            const isActive = activePassage?.id === ch.id;
                            const isCurrentChapter =
                              chIdx === book.progress.chapterIndex;
                            const isRead = chIdx < book.progress.chapterIndex;
                            const pageCount = getChapterPageCount(ch.text);
                            const isChapterExpanded = expandedChapterIdx === chIdx && expandedBook === book.id;
                            return (
                              <div key={ch.id}>
                                <div
                                  className={`w-full text-left px-4 py-2.5 text-xs border-t border-ink/5 flex items-center justify-between gap-2 ${
                                    isActive ? "bg-accent-soft/30" : ""
                                  }`}
                                >
                                  <button
                                    onClick={() =>
                                      handleSelectChapter(ch, book)
                                    }
                                    className="flex items-center gap-2 min-w-0 flex-1 hover:text-accent transition-colors"
                                  >
                                    {isRead ? (
                                      <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="shrink-0 text-accent"
                                      >
                                        <path d="M2 6l3 3 5-5" />
                                      </svg>
                                    ) : isCurrentChapter ? (
                                      <span className="shrink-0 w-3 h-3 rounded-full border-2 border-accent" />
                                    ) : (
                                      <span className="shrink-0 w-3 h-3 rounded-full border border-ink/20" />
                                    )}
                                    <span
                                      className={`truncate ${isRead ? "text-ink-faint" : "text-ink"}`}
                                    >
                                      {ch.title}
                                    </span>
                                  </button>
                                  <button
                                    onClick={() =>
                                      setExpandedChapterIdx(
                                        isChapterExpanded ? null : chIdx
                                      )
                                    }
                                    className="shrink-0 flex items-center gap-1 text-ink-faint hover:text-ink transition-colors"
                                  >
                                    <span>{pageCount} pg</span>
                                    <svg
                                      width="10"
                                      height="10"
                                      viewBox="0 0 10 10"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      className={`transition-transform ${isChapterExpanded ? "rotate-180" : ""}`}
                                    >
                                      <path d="M2 3.5l3 3 3-3" />
                                    </svg>
                                  </button>
                                </div>
                                {/* Page list */}
                                {isChapterExpanded && (
                                  <div className="bg-paper-dark/30">
                                    {Array.from(
                                      { length: pageCount },
                                      (_, pgIdx) => {
                                        const isPageActive =
                                          isActive &&
                                          book.progress.chapterIndex === chIdx &&
                                          book.progress.pageIndex === pgIdx;
                                        return (
                                          <button
                                            key={pgIdx}
                                            onClick={() =>
                                              handleSelectChapter(
                                                ch,
                                                book,
                                                pgIdx
                                              )
                                            }
                                            className={`w-full text-left pl-10 pr-4 py-1.5 text-[11px] border-t border-ink/3 hover:bg-paper-dark/50 transition-colors flex items-center justify-between ${
                                              isPageActive
                                                ? "text-accent font-medium"
                                                : "text-ink-faint"
                                            }`}
                                          >
                                            <span>Page {pgIdx + 1}</span>
                                          </button>
                                        );
                                      }
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="px-4 pt-4 pb-2">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-ink-faint">
            {filtered.length} {filtered.length === 1 ? "text" : "texts"}
          </p>
        </div>
      </div>

      {/* Text grid */}
      <main className="flex-1 px-4 pb-16">
        <div className="max-w-3xl mx-auto grid gap-3 sm:grid-cols-2">
          {filtered.map((p) => {
            const isActive = activePassage?.id === p.id;
            const isCustom = p.source === "custom";
            const isEditing = editingId === p.id;

            if (isEditing) {
              return (
                <div
                  key={p.id}
                  className="p-4 rounded-xl border border-accent ring-2 ring-accent/30 bg-paper space-y-3"
                >
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-paper-dark border border-ink/10 rounded-lg px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={4}
                    className="w-full bg-paper-dark border border-ink/10 rounded-lg px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-1 focus:ring-accent resize-y"
                  />
                  <div className="flex items-center gap-2">
                    {(["easy", "medium", "hard"] as const).map((d) => (
                      <button
                        key={d}
                        onClick={() => setEditDifficulty(d)}
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                          editDifficulty === d
                            ? "bg-accent text-white"
                            : "bg-paper-dark text-ink-light hover:text-ink"
                        }`}
                      >
                        {difficultyLabels[d]}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1.5 text-xs text-ink-faint hover:text-ink transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      disabled={!editTitle.trim() || !editText.trim()}
                      className="px-4 py-1.5 rounded-lg text-xs font-medium bg-accent text-white hover:bg-accent-hover transition-colors disabled:opacity-40"
                    >
                      Save
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={p.id}
                className={`p-4 rounded-xl border transition-all ${
                  isActive
                    ? "border-accent ring-2 ring-accent/30 bg-accent-soft/30"
                    : "border-ink/8 bg-paper hover:bg-paper-dark hover:border-ink/15"
                }`}
              >
                <button
                  onClick={() => setPassage(p)}
                  className="text-left w-full"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-serif font-semibold text-sm leading-tight">
                      {p.title}
                    </h2>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {isCustom && (
                        <span className="text-[10px] font-medium text-ink-faint bg-paper-dark px-1.5 py-0.5 rounded">
                          Custom
                        </span>
                      )}
                      {isActive && (
                        <span className="text-[10px] font-medium text-accent uppercase tracking-wide">
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-medium text-ink-faint bg-paper-dark px-2 py-0.5 rounded-full">
                      {categoryLabels[p.category]}
                    </span>
                    <span className="flex items-center gap-1">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${difficultyColor[p.difficulty]}`}
                      />
                      <span className="text-[10px] text-ink-faint">
                        {difficultyLabels[p.difficulty]}
                      </span>
                    </span>
                    <span className="text-[10px] text-ink-faint">
                      {p.wordCount} words
                    </span>
                  </div>
                  <p className="text-xs text-ink-light mt-2 line-clamp-2 leading-relaxed">
                    {p.text.slice(0, 150)}...
                  </p>
                </button>
                {isCustom && (
                  <div className="flex items-center gap-1 mt-2 pt-2 border-t border-ink/5">
                    <button
                      onClick={() => handleStartEdit(p)}
                      className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-ink-faint hover:text-ink transition-colors rounded"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCustomText(p.id)}
                      className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-ink-faint hover:text-red-500 transition-colors rounded"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                      </svg>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && books.length === 0 && (
          <div className="text-center py-12">
            <p className="text-ink-faint text-sm">
              No texts match your filters.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
