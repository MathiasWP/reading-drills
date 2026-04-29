"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useActivePassage } from "@/components/ActivePassageProvider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  getBook,
  getCustomTextsByBook,
  updateBookProgress,
  type BookRecord,
} from "@/lib/db";
import type { TextPassage } from "@/lib/texts";
import { getChapterPageCount } from "@/lib/pages";

export function BookNavigation() {
  const {
    fullPassage,
    setPassage,
    currentPage,
    totalPages,
    setCurrentPage,
    autoAdvance,
    setAutoAdvance,
  } = useActivePassage();
  const [book, setBook] = useState<BookRecord | null>(null);
  const [chapters, setChapters] = useState<TextPassage[]>([]);
  const [chapterOpen, setChapterOpen] = useState(false);
  const pathname = usePathname();

  const bookId = fullPassage?.bookId;
  const chapterIndex = fullPassage?.chapterIndex ?? 0;

  useEffect(() => {
    if (!bookId) {
      setBook(null);
      setChapters([]);
      return;
    }
    getBook(bookId).then((b) => setBook(b ?? null));
    getCustomTextsByBook(bookId).then((chs) => {
      chs.sort((a, b) => (a.chapterIndex ?? 0) - (b.chapterIndex ?? 0));
      setChapters(chs);
    });
  }, [bookId]);

  const saveProgress = useCallback(
    (chIdx: number, pgIdx: number) => {
      if (book) {
        updateBookProgress(book.id, {
          chapterIndex: chIdx,
          pageIndex: pgIdx,
        });
      }
    },
    [book]
  );

  const goToChapter = useCallback(
    (index: number, page: number = 0) => {
      const ch = chapters[index];
      if (!ch || !book) return;
      setPassage(ch, page);
      saveProgress(index, page);
    },
    [chapters, book, setPassage, saveProgress]
  );

  const goNextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      saveProgress(chapterIndex, newPage);
    } else if (chapterIndex < chapters.length - 1) {
      goToChapter(chapterIndex + 1, 0);
    }
  }, [
    currentPage,
    totalPages,
    chapterIndex,
    chapters.length,
    setCurrentPage,
    saveProgress,
    goToChapter,
  ]);

  const goPrevPage = useCallback(() => {
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      saveProgress(chapterIndex, newPage);
    } else if (chapterIndex > 0) {
      const prevCh = chapters[chapterIndex - 1];
      if (prevCh) {
        const prevPages = getChapterPageCount(prevCh.text);
        goToChapter(chapterIndex - 1, prevPages - 1);
      }
    }
  }, [
    currentPage,
    chapterIndex,
    chapters,
    setCurrentPage,
    saveProgress,
    goToChapter,
  ]);

  // Listen for auto-advance signal from context
  const { advanceSignal } = useActivePassage() as ReturnType<
    typeof useActivePassage
  > & { advanceSignal: number };
  useEffect(() => {
    if (advanceSignal > 0) {
      goNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advanceSignal]);

  const hasPrev = currentPage > 0 || chapterIndex > 0;
  const hasNext =
    currentPage < totalPages - 1 || chapterIndex < chapters.length - 1;

  if (!fullPassage?.source || fullPassage.source !== "epub" || !book)
    return null;

  const libraryUrl = pathname
    ? `/library?from=${encodeURIComponent(pathname)}`
    : "/library";

  return (
    <div className="space-y-2">
      {/* Book title + library link */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-ink truncate">
          <span className="font-medium">{book.title}</span>
          <span className="text-ink-faint"> &middot; {fullPassage.title}</span>
        </span>
        <Link
          href={libraryUrl}
          className="shrink-0 text-[10px] font-medium text-accent hover:text-accent-hover transition-colors"
        >
          Library
        </Link>
      </div>

      {/* Page + chapter position */}
      <div className="flex items-center justify-between text-[10px] text-ink-faint">
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <span>
          Chapter {chapterIndex + 1} of {chapters.length}
        </span>
      </div>

      {/* Page navigation */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={goPrevPage}
          disabled={!hasPrev}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-paper-dark text-ink-light hover:text-ink transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M7 2L3 6l4 4" />
          </svg>
          Prev Page
        </button>

        {/* Chapter dropdown */}
        <Popover open={chapterOpen} onOpenChange={setChapterOpen}>
          <PopoverTrigger className="flex-1 min-w-0">
            <div className="bg-paper-dark border border-ink/10 rounded-lg px-2 py-1.5 text-xs text-ink cursor-pointer hover:border-ink/20 transition-colors text-center truncate flex items-center justify-center gap-1 w-full">
              <span className="truncate">
                {chapters[chapterIndex]?.title ??
                  `Chapter ${chapterIndex + 1}`}
              </span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="shrink-0 text-ink-faint"
              >
                <path d="M2.5 6l2.5-2.5 2.5 2.5" />
              </svg>
            </div>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="center"
            sideOffset={6}
            matchTriggerWidth
            className="max-h-64 overflow-y-auto subtle-scrollbar p-0 rounded-xl"
          >
            <div className="px-3 pt-2.5 pb-1 text-[10px] font-medium text-ink-faint uppercase tracking-wide">
              Chapters
            </div>
            {chapters.map((ch, i) => {
              const pageCount = getChapterPageCount(ch.text);
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    goToChapter(i);
                    setChapterOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-paper-dark transition-colors flex items-center gap-2 ${
                    i === chapterIndex
                      ? "text-accent font-medium"
                      : "text-ink"
                  }`}
                >
                  <span className="truncate">{ch.title}</span>
                  <span className="ml-auto shrink-0 text-ink-faint text-[10px]">
                    {pageCount} pg
                  </span>
                </button>
              );
            })}
          </PopoverContent>
        </Popover>

        <button
          onClick={goNextPage}
          disabled={!hasNext}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-paper-dark text-ink-light hover:text-ink transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next Page
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M5 2l4 4-4 4" />
          </svg>
        </button>
      </div>

      {/* Chapter progress bar */}
      {totalPages > 1 && (
        <div className="w-full h-0.5 bg-paper-dark rounded-full overflow-hidden">
          <div
            className="h-full bg-accent/60 rounded-full"
            style={{
              width: `${((currentPage + 1) / totalPages) * 100}%`,
            }}
          />
        </div>
      )}

      {/* Auto-advance toggle */}
      <label className="flex items-center justify-between gap-2 cursor-pointer">
        <span className="text-[10px] text-ink-faint">
          Auto-advance to next page
        </span>
        <button
          onClick={() => setAutoAdvance(!autoAdvance)}
          className={`relative w-8 h-[18px] rounded-full transition-colors ${
            autoAdvance ? "bg-accent" : "bg-ink/15"
          }`}
        >
          <span
            className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform ${
              autoAdvance ? "left-[16px]" : "left-[2px]"
            }`}
          />
        </button>
      </label>
    </div>
  );
}
