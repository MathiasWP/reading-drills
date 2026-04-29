"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import type { TextPassage } from "@/lib/texts";
import {
  getActivePassage,
  setActivePassageId,
  getAllPassages,
} from "@/lib/library";
import { splitIntoPages } from "@/lib/pages";
import { getPref, setPref } from "@/lib/db";

interface ActivePassageContextValue {
  passage: TextPassage | null;
  fullPassage: TextPassage | null;
  setPassage: (p: TextPassage, page?: number) => void;
  allPassages: TextPassage[];
  isLoading: boolean;
  refreshPassages: () => Promise<void>;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  autoAdvance: boolean;
  setAutoAdvance: (v: boolean) => void;
  /** Called by exercises when playback finishes — triggers auto-advance if enabled */
  onExerciseFinished: () => void;
  /**
   * Ref that is true during an auto-advance page transition.
   * Exercises should check this in their reset effect to keep playing.
   */
  isAutoAdvancingRef: React.RefObject<boolean>;
}

const ActivePassageContext = createContext<ActivePassageContextValue>({
  passage: null,
  fullPassage: null,
  setPassage: () => {},
  allPassages: [],
  isLoading: true,
  refreshPassages: async () => {},
  currentPage: -1,
  totalPages: 0,
  setCurrentPage: () => {},
  autoAdvance: false,
  setAutoAdvance: () => {},
  onExerciseFinished: () => {},
  isAutoAdvancingRef: { current: false },
});

export function ActivePassageProvider({ children }: { children: ReactNode }) {
  const [fullPassage, setFullPassageState] = useState<TextPassage | null>(null);
  const [allPassages, setAllPassages] = useState<TextPassage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPageState] = useState(0);
  const [autoAdvance, setAutoAdvanceState] = useState(false);
  const [advanceSignal, setAdvanceSignal] = useState(0);
  const isAutoAdvancingRef = useRef(false);

  useEffect(() => {
    Promise.all([getActivePassage(), getAllPassages()]).then(
      ([active, all]) => {
        setFullPassageState(active);
        setAllPassages(all);
        if (active.source === "epub") {
          getPref<number>(`page-${active.id}`, 0).then(setCurrentPageState);
        } else {
          setCurrentPageState(0);
        }
        setIsLoading(false);
      }
    );
    getPref<boolean>("auto-advance", false).then(setAutoAdvanceState);
  }, []);

  const setPassage = useCallback((p: TextPassage, page?: number) => {
    setFullPassageState(p);
    setActivePassageId(p.id);
    const pg = page ?? 0;
    setCurrentPageState(pg);
    if (p.source === "epub") {
      setPref(`page-${p.id}`, pg);
    }
  }, []);

  const setCurrentPage = useCallback(
    (page: number) => {
      setCurrentPageState(page);
      if (fullPassage?.source === "epub") {
        setPref(`page-${fullPassage.id}`, page);
      }
    },
    [fullPassage]
  );

  const setAutoAdvance = useCallback((v: boolean) => {
    setAutoAdvanceState(v);
    setPref("auto-advance", v);
  }, []);

  const onExerciseFinished = useCallback(() => {
    if (autoAdvance && fullPassage?.source === "epub") {
      isAutoAdvancingRef.current = true;
      setAdvanceSignal((s) => s + 1);
    }
  }, [autoAdvance, fullPassage?.source]);

  const refreshPassages = useCallback(async () => {
    const all = await getAllPassages();
    setAllPassages(all);
  }, []);

  // For epub passages, slice text to just the current page
  const { passage, totalPages } = useMemo(() => {
    if (!fullPassage || fullPassage.source !== "epub") {
      return { passage: fullPassage, totalPages: 0 };
    }
    const pages = splitIntoPages(fullPassage.text);
    const total = pages.length;
    if (total <= 1) {
      return { passage: fullPassage, totalPages: total };
    }
    const safeIndex = Math.min(Math.max(0, currentPage), total - 1);
    const pageText = pages[safeIndex];
    const pageWords = pageText.split(/\s+/).filter(Boolean).length;
    return {
      passage: {
        ...fullPassage,
        text: pageText,
        wordCount: pageWords,
      },
      totalPages: total,
    };
  }, [fullPassage, currentPage]);

  const value = useMemo(
    () => ({
      passage,
      fullPassage,
      setPassage,
      allPassages,
      isLoading,
      refreshPassages,
      currentPage: fullPassage?.source === "epub" ? currentPage : -1,
      totalPages,
      setCurrentPage,
      autoAdvance,
      setAutoAdvance,
      onExerciseFinished,
      advanceSignal,
      isAutoAdvancingRef,
    }),
    [
      passage,
      fullPassage,
      setPassage,
      allPassages,
      isLoading,
      refreshPassages,
      currentPage,
      totalPages,
      setCurrentPage,
      autoAdvance,
      setAutoAdvance,
      onExerciseFinished,
      advanceSignal,
    ]
  );

  return (
    <ActivePassageContext.Provider value={value}>
      {children}
    </ActivePassageContext.Provider>
  );
}

export function useActivePassage() {
  return useContext(ActivePassageContext);
}
