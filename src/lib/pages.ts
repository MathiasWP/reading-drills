const DEFAULT_WORDS_PER_PAGE = 250;

export function splitIntoPages(
  text: string,
  wordsPerPage: number = DEFAULT_WORDS_PER_PAGE
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const pages: string[] = [];
  for (let i = 0; i < words.length; i += wordsPerPage) {
    pages.push(words.slice(i, i + wordsPerPage).join(" "));
  }
  return pages;
}

export function getTotalPages(
  chapters: { text: string }[],
  wordsPerPage: number = DEFAULT_WORDS_PER_PAGE
): number {
  return chapters.reduce((total, ch) => {
    const wordCount = ch.text.split(/\s+/).filter(Boolean).length;
    return total + Math.ceil(wordCount / wordsPerPage);
  }, 0);
}

export function getChapterPageCount(
  text: string,
  wordsPerPage: number = DEFAULT_WORDS_PER_PAGE
): number {
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.ceil(wordCount / wordsPerPage);
}
