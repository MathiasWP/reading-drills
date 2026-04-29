import { getPassages, type TextPassage } from "./texts";
import { getCustomTexts, getPref, setPref } from "./db";

export async function getAllPassages(): Promise<TextPassage[]> {
  const builtin = getPassages();
  const custom = await getCustomTexts();
  return [...builtin, ...custom];
}

const DEFAULT_PASSAGE_ID = "sun";

export async function getActivePassageId(): Promise<string> {
  return getPref<string>("active-passage", DEFAULT_PASSAGE_ID);
}

export async function setActivePassageId(id: string): Promise<void> {
  return setPref("active-passage", id);
}

export async function getActivePassage(): Promise<TextPassage> {
  const allPassages = await getAllPassages();
  const activeId = await getActivePassageId();
  return (
    allPassages.find((p) => p.id === activeId) ??
    allPassages[0] ??
    getPassages()[0]
  );
}
