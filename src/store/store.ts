import { create } from "zustand";
import { Message } from "@/types/chat";

interface ChatState {
  messages: Message[];
  addMessage: (message: Message) => void;
  updateMessage: (
    id: number,
    { text, image }: { text: string; image?: string },
  ) => void;
  deleteMessage: (id: number) => void;
  initializeMessages: () => void;
  pending: boolean;
  setPending: () => void;
  theme: "Dark" | "Light" | null;
  setTheme: (newTheme: "Dark" | "Light") => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  pending: false,
  theme: null,

  setTheme: (newTheme) =>
    set(() => {
      return { theme: newTheme };
    }),

  initializeMessages: () => {
    if (typeof window !== "undefined") {
      const storedMessages = localStorage.getItem("messages");
      if (storedMessages) {
        set({ messages: JSON.parse(storedMessages) });
      }
    }
  },

  addMessage: (message: Message) =>
    set((state) => {
      const updatedMessages = [...state.messages, message];
      localStorage.setItem("messages", JSON.stringify(updatedMessages));
      return { messages: updatedMessages };
    }),

  setPending: () => set(({ pending }) => ({ pending: !pending })),

  updateMessage: (id, body) =>
    set((state) => {
      const updatedMessages = state.messages.map((msg) =>
        msg.id === id ? { ...msg, ...body } : msg,
      );
      localStorage.setItem("messages", JSON.stringify(updatedMessages));
      return { messages: updatedMessages };
    }),

  deleteMessage: (id: number) =>
    set((state) => {
      const updatedMessages = state.messages.filter((msg) => msg.id !== id);
      localStorage.setItem("messages", JSON.stringify(updatedMessages));
      return { messages: updatedMessages };
    }),
}));
