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

export default function PacerPage() {
  const { passage, onExerciseFinished, isAutoAdvancingRef } = useActivePassage();
  const [wpm, setWpm] = useState(300);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(-1);
  const wordsPerLine = 8;
  const lines = splitIntoLines(passage?.text ?? "", wordsPerLine);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeLineRef = useRef<HTMLParagraphElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isFinished = currentLine >= lines.length;

  useEffect(() => {
    getPref<number>("pacer-wpm", 300).then(setWpm);
  }, []);

  // Reset when passage changes
  useEffect(() => {
    if (isAutoAdvancingRef.current) {
      setCurrentLine(-1);
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
      isAutoAdvancingRef.current = false;
    } else {
      setCurrentLine(-1);
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
    }
  }, [passage?.text, isAutoAdvancingRef]);

  useLayoutEffect(() => {
    if (activeLineRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const el = activeLineRef.current;
      const elTop = el.offsetTop - container.offsetTop;
      const containerHeight = container.clientHeight;
      container.scrollTop = elTop - containerHeight / 3;
    }
  }, [currentLine]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const play = useCallback(() => {
    if (isFinished) setCurrentLine(-1);
    setIsPlaying(true);
  }, [isFinished]);

  useEffect(() => {
    if (!isPlaying) return;

    const msPerLine = (60000 / wpm) * wordsPerLine;

    intervalRef.current = setInterval(() => {
      setCurrentLine((prev) => {
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
    setCurrentLine(-1);
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
  };

  const handleWpmChange = (v: number) => {
    setWpm(v);
    setPref("pacer-wpm", v);
  };

  const progress =
    lines.length > 0 ? (Math.max(0, currentLine) / lines.length) * 100 : 0;

  if (!passage) return null;

  return (
    <ExerciseLayout
      title="Reading Pacer"
      description="Follow the highlight bar at your target reading speed"
    >
      <div className="flex-1 flex flex-col min-h-0">
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto subtle-scrollbar px-4 py-8"
        >
          <div className="max-w-2xl mx-auto">
            <div className="reading-text space-y-1">
              {lines.map((line, i) => (
                <p
                  key={i}
                  ref={i === currentLine ? activeLineRef : null}
                  className={`px-3 py-1.5 rounded-lg ${
                    i === currentLine
                      ? "bg-accent/15 text-ink"
                      : i < currentLine
                        ? "text-ink-faint"
                        : "text-ink-light"
                  }`}
                >
                  {line}
                </p>
              ))}
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
