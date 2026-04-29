"use client";

interface PlayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
  onReset: () => void;
  isFinished?: boolean;
}

export function PlayButton({
  isPlaying,
  onToggle,
  onReset,
  isFinished,
}: PlayButtonProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-5 py-2 rounded-lg bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors"
      >
        {isFinished ? (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 4v6h6M23 20v-6h-6" />
              <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
            </svg>
            Restart
          </>
        ) : isPlaying ? (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
            Pause
          </>
        ) : (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
            Start
          </>
        )}
      </button>
      {!isFinished && (
        <button
          onClick={onReset}
          className="p-2 rounded-lg text-ink-faint hover:text-ink hover:bg-paper-dark transition-colors"
          aria-label="Reset"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 4v6h6" />
            <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
          </svg>
        </button>
      )}
    </div>
  );
}
