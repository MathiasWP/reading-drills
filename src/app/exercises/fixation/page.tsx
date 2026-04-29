"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from "react";
import { ExerciseLayout } from "@/components/ExerciseLayout";
import { SpeedControl } from "@/components/SpeedControl";
import { TextSelector } from "@/components/TextSelector";
import { PlayButton } from "@/components/PlayButton";
import { useActivePassage } from "@/components/ActivePassageProvider";
import { getPref, setPref } from "@/lib/db";

interface FixationLine {
  words: string[];
  fixationPoints: number[];
}

function buildFixationLines(
  text: string,
  wordsPerLine: number,
  fixationsPerLine: number
): FixationLine[] {
  const words = text.split(/\s+/);
  const lines: FixationLine[] = [];

  for (let i = 0; i < words.length; i += wordsPerLine) {
    const lineWords = words.slice(i, i + wordsPerLine);
    const points: number[] = [];
    const step = Math.max(1, Math.floor(lineWords.length / fixationsPerLine));
    for (let j = 0; j < fixationsPerLine && j * step < lineWords.length; j++) {
      points.push(
        Math.min(j * step + Math.floor(step / 2), lineWords.length - 1)
      );
    }
    lines.push({ words: lineWords, fixationPoints: points });
  }

  return lines;
}

export default function FixationPage() {
  const { passage, onExerciseFinished, isAutoAdvancingRef } = useActivePassage();
  const [wpm, setWpm] = useState(300);
  const [fixationsPerLine, setFixationsPerLine] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const wordsPerLine = 10;
  const lines = useMemo(
    () => buildFixationLines(passage?.text ?? "", wordsPerLine, fixationsPerLine),
    [passage?.text, fixationsPerLine]
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  const totalFixations = useMemo(
    () => lines.reduce((sum, l) => sum + l.fixationPoints.length, 0),
    [lines]
  );

  const { currentLine, currentFixation } = useMemo(() => {
    let remaining = step;
    for (let i = 0; i < lines.length; i++) {
      if (remaining < lines[i].fixationPoints.length) {
        return { currentLine: i, currentFixation: remaining };
      }
      remaining -= lines[i].fixationPoints.length;
    }
    return { currentLine: lines.length, currentFixation: 0 };
  }, [step, lines]);

  const isFinished = currentLine >= lines.length;

  useEffect(() => {
    getPref<number>("fixation-wpm", 300).then(setWpm);
    getPref<number>("fixation-points", 3).then(setFixationsPerLine);
  }, []);

  // Reset when passage changes
  useEffect(() => {
    if (isAutoAdvancingRef.current) {
      setStep(0);
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
      isAutoAdvancingRef.current = false;
    } else {
      setStep(0);
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
    if (isFinished) setStep(0);
    setIsPlaying(true);
  }, [isFinished]);

  useEffect(() => {
    if (!isPlaying) return;

    const wordsPerFixation = wordsPerLine / fixationsPerLine;
    const msPerFixation = (60000 / wpm) * wordsPerFixation;

    intervalRef.current = setInterval(() => {
      setStep((prev) => {
        const next = prev + 1;
        if (next >= totalFixations) {
          onExerciseFinished();
          if (!isAutoAdvancingRef.current) {
            stop();
          }
          return totalFixations;
        }
        return next;
      });
    }, msPerFixation);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, wpm, fixationsPerLine, wordsPerLine, totalFixations, stop, onExerciseFinished, isAutoAdvancingRef]);

  const handleToggle = () => {
    if (isPlaying) stop();
    else play();
  };

  const handleReset = () => {
    stop();
    setStep(0);
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
  };

  const handleWpmChange = (v: number) => {
    setWpm(v);
    setPref("fixation-wpm", v);
  };

  const handleFixationsChange = (v: number) => {
    setFixationsPerLine(v);
    setPref("fixation-points", v);
    stop();
    setStep(0);
  };

  const progress = totalFixations > 0 ? (step / totalFixations) * 100 : 0;

  if (!passage) return null;

  return (
    <ExerciseLayout
      title="Fixation Trainer"
      description="Train your eyes to make fewer, wider fixation jumps per line"
    >
      <div className="flex-1 flex flex-col min-h-0">
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto subtle-scrollbar px-4 py-8"
        >
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {lines.map((line, lineIdx) => (
                <div
                  key={lineIdx}
                  ref={lineIdx === currentLine ? activeLineRef : null}
                  className="relative"
                >
                  <div className="flex mb-1 h-3">
                    {line.words.map((_, wordIdx) => {
                      const isFixPoint = line.fixationPoints.includes(wordIdx);
                      const isActive =
                        lineIdx === currentLine &&
                        line.fixationPoints[currentFixation] === wordIdx;
                      if (!isFixPoint)
                        return <span key={wordIdx} className="flex-1" />;
                      return (
                        <span
                          key={wordIdx}
                          className="flex-1 flex justify-center"
                        >
                          <span
                            className={`rounded-full ${
                              isActive
                                ? "w-2.5 h-2.5 bg-accent"
                                : lineIdx < currentLine
                                  ? "w-2 h-2 bg-ink-faint/30"
                                  : "w-2 h-2 bg-ink-faint/50"
                            }`}
                          />
                        </span>
                      );
                    })}
                  </div>
                  <p
                    className={`reading-text flex gap-[0.4em] ${
                      lineIdx === currentLine
                        ? "text-ink"
                        : lineIdx < currentLine
                          ? "text-ink-faint"
                          : "text-ink-light"
                    }`}
                  >
                    {line.words.map((word, wordIdx) => {
                      const fixIndex = line.fixationPoints.indexOf(wordIdx);
                      const isNearActive =
                        lineIdx === currentLine &&
                        fixIndex !== -1 &&
                        fixIndex === currentFixation;
                      return (
                        <span
                          key={wordIdx}
                          className={`flex-1 text-center ${
                            isNearActive ? "font-semibold text-accent" : ""
                          }`}
                        >
                          {word}
                        </span>
                      );
                    })}
                  </p>
                </div>
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
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <label className="text-xs text-ink-faint uppercase tracking-wide whitespace-nowrap">
                    Fixations
                  </label>
                  <div className="flex gap-1.5">
                    {[2, 3, 4].map((n) => (
                      <button
                        key={n}
                        onClick={() => handleFixationsChange(n)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          fixationsPerLine === n
                            ? "bg-accent text-white"
                            : "bg-paper-dark text-ink-light hover:text-ink"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-ink-faint">per line</span>
                </div>
                <TextSelector />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ExerciseLayout>
  );
}
