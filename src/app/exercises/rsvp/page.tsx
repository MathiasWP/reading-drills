"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ExerciseLayout } from "@/components/ExerciseLayout";
import { SpeedControl } from "@/components/SpeedControl";
import { TextSelector } from "@/components/TextSelector";
import { PlayButton } from "@/components/PlayButton";
import { useActivePassage } from "@/components/ActivePassageProvider";
import { getPref, setPref } from "@/lib/db";

export default function RSVPPage() {
  const { passage, onExerciseFinished, isAutoAdvancingRef } = useActivePassage();
  const [wpm, setWpm] = useState(250);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const words = passage?.text.split(/\s+/) ?? [];
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isFinished = currentIndex >= words.length;

  useEffect(() => {
    getPref<number>("rsvp-wpm", 250).then(setWpm);
  }, []);

  // Reset when passage changes
  useEffect(() => {
    if (isAutoAdvancingRef.current) {
      // Seamless: just reset position, keep playing
      setCurrentIndex(0);
      isAutoAdvancingRef.current = false;
    } else {
      setCurrentIndex(0);
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [passage?.text, isAutoAdvancingRef]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const play = useCallback(() => {
    if (isFinished) setCurrentIndex(0);
    setIsPlaying(true);
  }, [isFinished]);

  useEffect(() => {
    if (!isPlaying) return;

    const msPerWord = 60000 / wpm;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= words.length - 1) {
          onExerciseFinished();
          // If auto-advancing, don't stop — the reset effect will handle it
          if (!isAutoAdvancingRef.current) {
            stop();
          }
          return words.length;
        }
        return prev + 1;
      });
    }, msPerWord);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, wpm, words.length, stop, onExerciseFinished, isAutoAdvancingRef]);

  const handleToggle = () => {
    if (isPlaying) stop();
    else play();
  };

  const handleReset = () => {
    stop();
    setCurrentIndex(0);
  };

  const handleWpmChange = (newWpm: number) => {
    setWpm(newWpm);
    setPref("rsvp-wpm", newWpm);
  };

  const progress = words.length > 0 ? (currentIndex / words.length) * 100 : 0;

  if (!passage) return null;

  return (
    <ExerciseLayout
      title="RSVP Reader"
      description="Words flash one at a time — eliminating eye movement overhead"
    >
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 flex items-center justify-center px-4">
          <span className="font-serif text-4xl sm:text-6xl font-medium text-center select-none">
            {isFinished
              ? "Done!"
              : currentIndex < words.length
                ? words[currentIndex]
                : "Ready"}
          </span>
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
