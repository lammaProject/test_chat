"use client";

import React, { useEffect } from "react";
import MessageItem from "./MessageItem/MessageItem";
import dayjs from "dayjs";
import { useChatStore } from "@/store/store";
import useScrollToBottom from "@/app/(Chat)/chat/_hooks/useScrollToBottom";
import { Content } from "antd/es/layout/layout";
import { Flex } from "antd";

const currentDate = dayjs().format("MM/DD/YYYY");

const ChatWindow = () => {
  const { messages, initializeMessages } = useChatStore();

  const messagesEndRef = useScrollToBottom([messages]);

  useEffect(() => {
    initializeMessages();
  }, [initializeMessages]);

  return (
    <Content style={{ overflowY: "scroll" }}>
      <Flex justify={"center"} style={{ margin: "17px 0 20px 0" }}>
        {currentDate}
      </Flex>
      <Flex vertical gap={20}>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </Flex>
    </Content>
  );
};

export default ChatWindow;
