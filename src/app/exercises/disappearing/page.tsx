"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { ExerciseLayout } from "@/components/ExerciseLayout";
import { SpeedControl } from "@/components/SpeedControl";
import { TextSelector } from "@/components/TextSelector";
import { PlayButton } from "@/components/PlayButton";
import { useActivePassage } from "@/components/ActivePassageProvider";
import { getPref, setPref } from "@/lib/db";

function splitIntoLines(text: string, wordsPerLine: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  for (let i = 0; i < words.length; i += wordsPerLine) {
    lines.push(words.slice(i, i + wordsPerLine).join(" "));
  }
  return lines;
}

export default function DisappearingPage() {
  const { passage, onExerciseFinished, isAutoAdvancingRef } = useActivePassage();
  const [wpm, setWpm] = useState(250);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [fadedLines, setFadedLines] = useState<Set<number>>(new Set());
  const wordsPerLine = 8;
  const lines = splitIntoLines(passage?.text ?? "", wordsPerLine);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const activeLineRef = useRef<HTMLParagraphElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isFinished = currentLine >= lines.length;

  useEffect(() => {
    getPref<number>("disappearing-wpm", 250).then(setWpm);
  }, []);

  // Reset when passage changes
  useEffect(() => {
    if (isAutoAdvancingRef.current) {
      setCurrentLine(0);
      setFadedLines(new Set());
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
      isAutoAdvancingRef.current = false;
    } else {
      setCurrentLine(0);
      setFadedLines(new Set());
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      fadeTimeoutsRef.current.forEach(clearTimeout);
      fadeTimeoutsRef.current = [];
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
    }
  }, [passage?.text, isAutoAdvancingRef]);

  useLayoutEffect(() => {
    if (activeLineRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const el = activeLineRef.current;
      const elTop = el.offsetTop - container.offsetTop;
      const containerHeight = container.clientHeight;
      const scrollTarget = elTop - containerHeight / 3;
      container.scrollTop = scrollTarget;
    }
  }, [currentLine]);

  const clearFadeTimeouts = useCallback(() => {
    fadeTimeoutsRef.current.forEach(clearTimeout);
    fadeTimeoutsRef.current = [];
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    clearFadeTimeouts();
    setIsPlaying(false);
  }, [clearFadeTimeouts]);

  const play = useCallback(() => {
    if (isFinished) {
      setCurrentLine(0);
      setFadedLines(new Set());
    }
    setIsPlaying(true);
  }, [isFinished]);

  useEffect(() => {
    if (!isPlaying) return;

    const msPerLine = (60000 / wpm) * wordsPerLine;

    intervalRef.current = setInterval(() => {
      setCurrentLine((prev) => {
        setFadedLines((faded) => {
          const next = new Set(faded);
          next.add(prev);
          return next;
        });

        const next = prev + 1;
        if (next >= lines.length) {
          onExerciseFinished();
          if (!isAutoAdvancingRef.current) {
            stop();
          }
          return lines.length;
        }
        return next;
      });
    }, msPerLine);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, wpm, lines.length, wordsPerLine, stop, onExerciseFinished, isAutoAdvancingRef]);

  const handleToggle = () => {
    if (isPlaying) stop();
    else play();
  };

  const handleReset = () => {
    stop();
    setCurrentLine(0);
    setFadedLines(new Set());
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
  };

  const handleWpmChange = (v: number) => {
    setWpm(v);
    setPref("disappearing-wpm", v);
  };

  const progress = lines.length > 0 ? (currentLine / lines.length) * 100 : 0;

  if (!passage) return null;

  return (
    <ExerciseLayout
      title="Disappearing Text"
      description="Text fades behind you — no going back, no re-reading"
    >
      <div className="flex-1 flex flex-col min-h-0">
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto subtle-scrollbar px-4 py-8"
        >
          <div className="max-w-2xl mx-auto">
            <div className="reading-text space-y-2">
              {lines.map((line, i) => {
                const isFaded = fadedLines.has(i);
                const isActive = i === currentLine;
                return (
                  <p
                    key={i}
                    ref={isActive ? activeLineRef : null}
                    style={{
                      opacity: isFaded ? 0 : 1,
                      color: isActive
                        ? "var(--ink)"
                        : i < currentLine
                          ? "var(--ink-faint)"
                          : "var(--ink-light)",
                    }}
                  >
                    {line}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-ink/8 bg-paper px-4 py-4">
          <div className="w-full max-w-md lg:max-w-3xl mx-auto space-y-3">
            <div className="w-full h-1 bg-paper-dark rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-100 ease-linear rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center gap-4">
              <PlayButton
                isPlaying={isPlaying}
                onToggle={handleToggle}
                onReset={handleReset}
                isFinished={isFinished}
              />
              <div className="flex-1">
                <SpeedControl wpm={wpm} onChange={handleWpmChange} />
              </div>
            </div>
            <div
              className="overflow-hidden transition-[max-height,opacity] duration-200 ease-in-out"
              style={{
                maxHeight: isPlaying ? 0 : 150,
                opacity: isPlaying ? 0 : 1,
              }}
            >
              <TextSelector />
            </div>
          </div>
        </div>
      </div>
    </ExerciseLayout>
  );
}
