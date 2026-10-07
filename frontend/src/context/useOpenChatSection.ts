import { create } from "zustand";

interface UseOpenChatSection {
  isChatOpen: "open" | "close";
  toggleOpenChat: () => void;
}

export const useOpenChatSection = create<UseOpenChatSection>((set) => ({
  isChatOpen: getCurrentState(),

  toggleOpenChat: () => {
    const next = getCurrentState() === "close" ? "open" : "close";
    saveCurrentState(next);
    set({ isChatOpen: getCurrentState() });
  },
}));

function getCurrentState(): "open" | "close" {
  const isOpen: "close" | "open" = (localStorage.getItem("chat") || "close") as
    "close" | "open";
  return isOpen;
}

function saveCurrentState(state: "open" | "close") {
  localStorage.setItem("chat", state);
}
