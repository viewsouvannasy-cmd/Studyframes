import { create } from "zustand";

import type { StudyCardColorKey } from "../constants/color";

interface UseInputYoutubeSrc {
  inputData: {
    card_name: string;
    color: StudyCardColorKey | "";
    video_url: string;
  };
  setInput: (which: "card_name" | "video_url", param: string) => void;
  setColor: (color: StudyCardColorKey) => void;
  clearInput: () => void;
}

const useInputYoutubeSrc = create<UseInputYoutubeSrc>((set) => ({
  inputData: {
    card_name: "",
    color: "",
    video_url: "",
  },

  setInput: (which, value) => {
    set((state) => ({
      inputData: {
        card_name: which === "card_name" ? value : state.inputData.card_name,
        color: state.inputData.color,
        video_url: which === "video_url" ? value : state.inputData.video_url,
      },
    }));
  },

  setColor: (color) => {
    set((state) => ({
      inputData: {
        card_name: state.inputData.card_name,
        color: color,
        video_url: state.inputData.video_url,
      },
    }));
  },

  clearInput: () => {
    set({ inputData: { card_name: "", color: "", video_url: "" } });
  },
}));

export default useInputYoutubeSrc;
