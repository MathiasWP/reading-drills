"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ExerciseLayout } from "@/components/ExerciseLayout";
import { getPref, setPref, saveSession } from "@/lib/db";

function shuffleGrid(size: number): number[] {
  const nums = Array.from({ length: size * size }, (_, i) => i + 1);
  for (let i = nums.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  return nums;
}

export default function SchultePage() {
  const [gridSize, setGridSize] = useState(5);
  const [grid, setGrid] = useState<number[]>([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [lastWrong, setLastWrong] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    getPref<number>("schulte-size", 5).then((s) => {
      setGridSize(s);
      setGrid(shuffleGrid(s));
    });
  }, []);

  const startTimer = useCallback(() => {
    const now = Date.now();
    setStartTime(now);
    timerRef.current = setInterval(() => {
      setElapsed((Date.now() - now) / 1000);
    }, 100);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleCellClick = (num: number) => {
    if (isFinished) return;

    if (num === nextNumber) {
      if (!startTime) startTimer();
      setLastWrong(null);

      if (num === gridSize * gridSize) {
        stopTimer();
        setIsFinished(true);
        const finalTime = startTime ? (Date.now() - startTime) / 1000 : 0;
        setElapsed(finalTime);
        saveSession({
          exercise: "schulte",
          wpm: Math.round((gridSize * gridSize) / (finalTime / 60)),
          duration: Math.round(finalTime),
        });
      } else {
        setNextNumber(num + 1);
      }
    } else {
      setLastWrong(num);
      setTimeout(() => setLastWrong(null), 300);
    }
  };

  const handleReset = () => {
    stopTimer();
    setGrid(shuffleGrid(gridSize));
    setNextNumber(1);
    setStartTime(null);
    setElapsed(0);
    setIsFinished(false);
    setLastWrong(null);
  };

  const handleSizeChange = (size: number) => {
    setGridSize(size);
    setPref("schulte-size", size);
    stopTimer();
    setGrid(shuffleGrid(size));
    setNextNumber(1);
    setStartTime(null);
    setElapsed(0);
    setIsFinished(false);
    setLastWrong(null);
  };

  const total = gridSize * gridSize;
  const isOddGrid = gridSize % 2 === 1;
  const centerIndex = isOddGrid ? Math.floor(total / 2) : -1;

  return (
    <ExerciseLayout
      title="Schulte Table"
      description="Find numbers in order while keeping your eyes on the center dot"
    >
      <div className="flex-1 flex flex-col min-h-0">
        {/* Grid area */}
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          {/* Status */}
          <div className="flex items-center gap-6 mb-4 text-sm">
            <div className="text-ink-faint">
              Find:{" "}
              <span className="text-accent font-semibold text-lg">
                {nextNumber > total ? "Done!" : nextNumber}
              </span>
            </div>
            <div className="text-ink-faint tabular-nums">
              Time:{" "}
              <span className="font-medium text-ink">
                {elapsed.toFixed(1)}s
              </span>
            </div>
            <div className="text-ink-faint tabular-nums">
              {nextNumber - 1}/{total}
            </div>
          </div>

          {/* Grid */}
          <div
            className="grid gap-1.5 sm:gap-2 select-none relative"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              width: `min(85vw, ${gridSize * 64}px)`,
              height: `min(85vw, ${gridSize * 64}px)`,
            }}
          >
            {grid.map((num, i) => {
              const found = num < nextNumber;
              const isWrong = num === lastWrong;
              const isCenter = i === centerIndex;
              return (
                <button
                  key={i}
                  onClick={() => handleCellClick(num)}
                  disabled={found}
                  className={`
                    flex items-center justify-center rounded-lg font-serif font-semibold
                    select-none
                    ${isWrong ? "transition-transform duration-150" : ""}
                    ${gridSize <= 4 ? "text-xl sm:text-2xl" : gridSize <= 5 ? "text-lg sm:text-xl" : "text-sm sm:text-base"}
                    ${
                      found
                        ? "bg-accent/15 text-accent/40"
                        : isWrong
                          ? "bg-red-100 dark:bg-red-900/30 text-red-500 scale-95"
                          : isCenter
                            ? "bg-accent/10 ring-2 ring-accent/40 text-ink cursor-pointer active:scale-95"
                            : "bg-paper-dark hover:bg-accent/10 text-ink cursor-pointer active:scale-95"
                    }
                  `}
                >
                  {num}
                </button>
              );
            })}
            {/* Center crosshair overlay for even grids (no single center cell) */}
            {!isOddGrid && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-4 h-4 rounded-full bg-accent/15 ring-2 ring-accent/40" />
              </div>
            )}
          </div>

          {/* Finished message */}
          {isFinished && (
            <div className="mt-4 text-center">
              <p className="font-serif text-xl font-semibold">
                Completed in {elapsed.toFixed(1)} seconds
              </p>
              <p className="text-sm text-ink-faint mt-1">
                {gridSize}x{gridSize} grid — {total} numbers
              </p>
            </div>
          )}
        </div>

        {/* Fixed bottom controls */}
        <div className="shrink-0 border-t border-ink/8 bg-paper px-4 py-5">
          <div className="w-full max-w-sm mx-auto space-y-4">
            <div className="flex justify-center">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors"
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
                New Table
              </button>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <label className="text-xs text-ink-faint uppercase tracking-wide">
                Size
              </label>
              <div className="flex gap-1.5">
                {[3, 4, 5, 6, 7].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      gridSize === size
                        ? "bg-accent text-white"
                        : "bg-paper-dark text-ink-light hover:text-ink"
                    }`}
                  >
                    {size}x{size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ExerciseLayout>
  );
}
