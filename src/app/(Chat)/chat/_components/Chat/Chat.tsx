"use client";

import { Layout } from "antd";
import ChatHeader from "@/app/(Chat)/chat/_components/Chat/ChatHeader/ChatHeader";
import ChatWindow from "@/app/(Chat)/chat/_components/Chat/ChatWindow/ChatWindow";
import withTheme from "@/styles/theme/withTheme";
import ChatFooter from "@/app/(Chat)/chat/_components/Chat/ChatFooter/ChatFooter";

const Chat = () => {
  return (
    <Layout style={{ height: "100%" }}>
      <ChatHeader />
      <ChatWindow />
      <ChatFooter />
    </Layout>
  );
};

const ChatTheme = () => withTheme(<Chat />);

export default ChatTheme;
