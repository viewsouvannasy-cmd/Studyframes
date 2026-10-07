import { create } from "zustand";

interface UseOnChapter {
  currentChapter: string;
  setCurrentChapter: (param: string) => void;
}

export const useOnChapter = create<UseOnChapter>((set) => ({
  currentChapter: "chapter-1",

  setCurrentChapter: (chapter_number: string) => {
    set({ currentChapter: chapter_number });
  },
}));
