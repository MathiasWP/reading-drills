"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function ExerciseLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-dvh flex flex-col overflow-hidden">
      <header className="border-b border-ink/10 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-ink-faint hover:text-ink transition-colors"
              aria-label="Back to exercises"
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
              <h1 className="font-serif text-lg font-semibold">{title}</h1>
              <p className="text-xs text-ink-faint hidden sm:block">
                {description}
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 flex flex-col min-h-0">{children}</main>
    </div>
  );
}
