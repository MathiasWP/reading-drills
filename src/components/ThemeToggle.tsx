"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle({ variant = "icon" }: { variant?: "icon" | "text" }) {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (variant === "text") {
    return (
      <button
        onClick={mounted ? toggle : undefined}
        className={`mt-4 text-xs text-ink-faint ${mounted ? "hover:text-ink" : ""}`}
      >
        {/* Always render the longer string to reserve space, swap when ready */}
        {!mounted ? "\u00A0" : theme === "light" ? "Dark mode" : "Light mode"}
      </button>
    );
  }

  return (
    <button
      onClick={mounted ? toggle : undefined}
      className={`p-2 rounded-lg text-ink-faint ${mounted ? "hover:bg-paper-dark hover:text-ink" : ""}`}
      aria-label="Toggle theme"
    >
      {!mounted ? (
        <div className="w-[18px] h-[18px]" />
      ) : theme === "light" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      )}
    </button>
  );
}
