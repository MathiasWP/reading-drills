"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActivePassage } from "@/components/ActivePassageProvider";
import { BookNavigation } from "@/components/BookNavigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  getCategories,
  categoryLabels,
  type TextCategory,
} from "@/lib/texts";

export function TextSelector() {
  const { passage, setPassage, allPassages } = useActivePassage();
  const [filterCat, setFilterCat] = useState<TextCategory | "all">("all");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isEpub = passage?.source === "epub";

  if (!passage) return null;

  if (isEpub) {
    return <BookNavigation />;
  }

  // Non-epub passages only (exclude epub chapters from picker)
  const pickablePassages = allPassages.filter((p) => p.source !== "epub");
  const categories = getCategories();

  const filtered =
    filterCat === "all"
      ? pickablePassages
      : pickablePassages.filter((p) => p.category === filterCat);

  // Group by difficulty
  const grouped = {
    easy: filtered.filter((p) => p.difficulty === "easy"),
    medium: filtered.filter((p) => p.difficulty === "medium"),
    hard: filtered.filter((p) => p.difficulty === "hard"),
  };

  const difficultyColor: Record<string, string> = {
    easy: "bg-green-500",
    medium: "bg-amber-500",
    hard: "bg-red-500",
  };

  return (
    <div className="flex items-center gap-3">
      <label className="text-xs text-ink-faint uppercase tracking-wide whitespace-nowrap">
        Text
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="flex-1">
          <div className="flex items-center justify-between gap-2 bg-paper-dark border border-ink/10 rounded-lg px-3 py-1.5 cursor-pointer hover:border-ink/20 transition-colors w-full text-left">
            <span className="text-sm text-ink truncate">
              {passage.title}
              <span className="text-ink-faint ml-1.5">
                &middot; {passage.wordCount} words
              </span>
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="shrink-0 text-ink-faint"
            >
              <path d="M3 7.5l3-3 3 3" />
            </svg>
          </div>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="start"
          sideOffset={6}
          matchTriggerWidth
          className="max-h-72 overflow-y-auto subtle-scrollbar p-0 rounded-xl"
        >
          {/* Category filter pills */}
          <div className="px-2 pt-2 pb-1.5 flex gap-1.5 flex-wrap">
            <button
              onClick={() => setFilterCat("all")}
              className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors ${
                filterCat === "all"
                  ? "bg-accent text-white"
                  : "bg-paper-dark text-ink-faint hover:text-ink"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors ${
                  filterCat === cat
                    ? "bg-accent text-white"
                    : "bg-paper-dark text-ink-faint hover:text-ink"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
          <div className="border-t border-ink/8 my-1" />
          {/* Passages grouped by difficulty */}
          {(["easy", "medium", "hard"] as const).map((diff) => {
            const items = grouped[diff];
            if (items.length === 0) return null;
            return (
              <div key={diff}>
                <div className="px-3 pt-2.5 pb-1 text-[10px] font-medium text-ink-faint uppercase tracking-wide flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${difficultyColor[diff]}`}
                  />
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </div>
                {items.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPassage(p);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-paper-dark transition-colors flex items-center gap-2 ${
                      p.id === passage.id
                        ? "text-accent font-medium"
                        : "text-ink"
                    }`}
                  >
                    <span className="truncate">{p.title}</span>
                    <span className="ml-auto shrink-0 text-ink-faint text-[10px]">
                      {p.wordCount}w
                    </span>
                  </button>
                ))}
              </div>
            );
          })}
          <div className="border-t border-ink/8 my-1" />
          <div className="px-3 py-2">
            <Link
              href={pathname ? `/library?from=${encodeURIComponent(pathname)}` : "/library"}
              className="text-[10px] font-medium text-accent hover:text-accent-hover transition-colors"
              onClick={() => setOpen(false)}
            >
              Open full library
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
