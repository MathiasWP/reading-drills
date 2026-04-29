"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { ExerciseLayout } from "@/components/ExerciseLayout";
import { SpeedControl } from "@/components/SpeedControl";
import { TextSelector } from "@/components/TextSelector";
import { PlayButton } from "@/components/PlayButton";
import { useActivePassage } from "@/components/ActivePassageProvider";
import { getPref, setPref } from "@/lib/db";

function chunkWords(text: string, size: number): string[][] {
  const words = text.split(/\s+/);
  const chunks: string[][] = [];
  for (let i = 0; i < words.length; i += size) {
    chunks.push(words.slice(i, i + size));
  }
  return chunks;
}

export default function ChunkingPage() {
  const { passage, onExerciseFinished, isAutoAdvancingRef } = useActivePassage();
  const [wpm, setWpm] = useState(300);
  const [chunkSize, setChunkSize] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChunk, setCurrentChunk] = useState(0);
  const chunks = chunkWords(passage?.text ?? "", chunkSize);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeChunkRef = useRef<HTMLSpanElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isFinished = currentChunk >= chunks.length;

  useEffect(() => {
    getPref<number>("chunking-wpm", 300).then(setWpm);
    getPref<number>("chunking-size", 3).then(setChunkSize);
  }, []);

  // Reset when passage changes
  useEffect(() => {
    if (isAutoAdvancingRef.current) {
      setCurrentChunk(0);
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
      isAutoAdvancingRef.current = false;
    } else {
      setCurrentChunk(0);
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
    }
  }, [passage?.text, isAutoAdvancingRef]);

  useLayoutEffect(() => {
    if (activeChunkRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const el = activeChunkRef.current;
      const elTop = el.offsetTop - container.offsetTop;
      const containerHeight = container.clientHeight;
      const scrollTarget = elTop - containerHeight / 3;
      container.scrollTop = scrollTarget;
    }
  }, [currentChunk]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const play = useCallback(() => {
    if (isFinished) setCurrentChunk(0);
    setIsPlaying(true);
  }, [isFinished]);

  useEffect(() => {
    if (!isPlaying) return;

    const msPerChunk = (60000 / wpm) * chunkSize;
    intervalRef.current = setInterval(() => {
      setCurrentChunk((prev) => {
        if (prev >= chunks.length - 1) {
          onExerciseFinished();
          if (!isAutoAdvancingRef.current) {
            stop();
          }
          return chunks.length;
        }
        return prev + 1;
      });
    }, msPerChunk);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, wpm, chunkSize, chunks.length, stop, onExerciseFinished, isAutoAdvancingRef]);

  const handleToggle = () => {
    if (isPlaying) stop();
    else play();
  };

  const handleReset = () => {
    stop();
    setCurrentChunk(0);
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
  };

  const handleWpmChange = (v: number) => {
    setWpm(v);
    setPref("chunking-wpm", v);
  };

  const handleChunkSizeChange = (v: number) => {
    setChunkSize(v);
    setPref("chunking-size", v);
    stop();
    setCurrentChunk(0);
  };

  const progress = chunks.length > 0 ? (currentChunk / chunks.length) * 100 : 0;

  if (!passage) return null;

  return (
    <ExerciseLayout
      title="Phrase Chunking"
      description="Train yourself to read word groups instead of individual words"
    >
      <div className="flex-1 flex flex-col min-h-0">
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto subtle-scrollbar px-4 py-8"
        >
          <div className="max-w-2xl mx-auto">
            <p className="reading-text leading-loose">
              {chunks.map((chunk, i) => {
                const isActive = i === currentChunk;
                const isPast = i < currentChunk;
                return (
                  <span
                    key={i}
                    ref={isActive ? activeChunkRef : null}
                    className={`inline rounded-sm ${
                      isActive
                        ? "bg-accent/20 text-ink"
                        : isPast
                          ? "text-ink-faint"
                          : "text-ink-light"
                    }`}
                  >
                    {chunk.join(" ")}
                    {" "}
                  </span>
                );
              })}
            </p>
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
                    Chunk
                  </label>
                  <div className="flex gap-1.5">
                    {[2, 3, 4, 5].map((size) => (
                      <button
                        key={size}
                        onClick={() => handleChunkSizeChange(size)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          chunkSize === size
                            ? "bg-accent text-white"
                            : "bg-paper-dark text-ink-light hover:text-ink"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-ink-faint">words</span>
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
