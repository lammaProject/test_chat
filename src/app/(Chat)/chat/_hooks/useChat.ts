"use client";

import dayjs from "dayjs";
import { useChatStore } from "@/store/store";
import { Message } from "@/types/chat";

export const useChat = () => {
  const {
    messages,
    setPending,
    pending,
    addMessage,
    updateMessage,
    deleteMessage,
    setTheme,
  } = useChatStore();

  const sendMessage = ({ text, image }: { text: string; image?: string }) => {
    const message: Message = {
      id: Date.now(),
      text,
      isBot: false,
      time: dayjs().format("MM/DD/YYYY HH:mm"),
      image: image || "",
    };

    addMessage(message);

    setPending();

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: "Hello World!",
        isBot: true,
        time: dayjs().format("MM/DD/YYYY HH:mm"),
        image: "",
      };

      addMessage(botMessage);
      setPending();
    }, 1000);
  };

  return {
    messages,
    pending,
    sendMessage,
    updateMessage,
    deleteMessage,
    setTheme,
  };
};
