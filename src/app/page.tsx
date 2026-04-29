"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const exercises = [
  {
    slug: "rsvp",
    title: "RSVP Reader",
    subtitle: "Rapid Serial Visual Presentation",
    description:
      "Words flash one at a time at a fixed point, training your brain to process text without eye movement.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="7" width="18" height="10" rx="2" />
        <path d="M10 12h4" />
      </svg>
    ),
  },
  {
    slug: "chunking",
    title: "Phrase Chunking",
    subtitle: "Read word groups, not single words",
    description:
      "Text is highlighted in meaningful phrases, training you to take in multiple words per fixation.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 7h6M14 7h6M4 12h8M14 12h6M4 17h5M11 17h9" />
      </svg>
    ),
  },
  {
    slug: "schulte",
    title: "Schulte Table",
    subtitle: "Expand your peripheral vision",
    description:
      "Find numbers in order while keeping your eyes on the center. Widens your useful visual span.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
      </svg>
    ),
  },
  {
    slug: "disappearing",
    title: "Disappearing Text",
    subtitle: "Eliminate re-reading habits",
    description:
      "Text fades away as you read, breaking the regression habit that slows most readers down.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 7h16M4 12h12M4 17h6" opacity="0.3" />
        <path d="M4 7h16" />
      </svg>
    ),
  },
  {
    slug: "pacer",
    title: "Reading Pacer",
    subtitle: "Guided pace training",
    description:
      "A highlight bar moves through the text at your target speed, training consistent reading pace.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 7h16M4 12h16M4 17h16" />
        <rect
          x="3"
          y="10"
          width="18"
          height="4"
          rx="1"
          fill="currentColor"
          opacity="0.15"
        />
      </svg>
    ),
  },
  {
    slug: "fixation",
    title: "Fixation Trainer",
    subtitle: "Fewer eye stops per line",
    description:
      "Practice jumping between fixation points, reducing the number of stops your eyes make per line.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="6" cy="12" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="18" cy="12" r="2" />
        <path d="M4 7h16M4 17h16" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="pt-12 pb-8 px-4 sm:pt-20 sm:pb-12 lg:pt-24 lg:pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
            Reading Drills
          </h1>
          <p className="mt-3 text-ink-light text-base sm:text-lg lg:text-xl max-w-lg mx-auto leading-relaxed">
            Free, science-backed exercises to improve your reading speed. No
            sign-up required.
          </p>
          <ThemeToggle variant="text" />
        </div>
      </header>

      <main className="px-4 pb-16 lg:px-8">
        <div className="max-w-4xl mx-auto grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {exercises.map((ex) => (
            <Link
              key={ex.slug}
              href={`/exercises/${ex.slug}`}
              className="group block p-5 lg:p-6 rounded-xl border border-ink/8 bg-paper hover:bg-paper-dark hover:border-ink/15 transition-all hover:shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="text-accent mt-0.5 shrink-0">{ex.icon}</div>
                <div className="min-w-0">
                  <h2 className="font-serif font-semibold text-base group-hover:text-accent transition-colors">
                    {ex.title}
                  </h2>
                  <p className="text-xs text-accent font-medium mt-0.5">
                    {ex.subtitle}
                  </p>
                  <p className="text-sm text-ink-light mt-1.5 leading-relaxed">
                    {ex.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-6">
          <Link
            href="/library"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-accent/30 bg-accent-soft/20 hover:bg-accent-soft/40 transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-accent"
            >
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              <path d="M8 7h8M8 11h6" />
            </svg>
            <span className="text-sm font-medium text-accent">
              Browse the text library
            </span>
          </Link>
        </div>
      </main>

      <footer className="border-t border-ink/8 py-6 px-4 text-center">
        <p className="text-xs text-ink-faint">
          All exercises are based on peer-reviewed reading research. No data is
          collected — everything stays in your browser.
        </p>
      </footer>
    </div>
  );
}
