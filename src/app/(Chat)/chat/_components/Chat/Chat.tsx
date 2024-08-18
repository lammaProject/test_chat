"use client";

import { Layout } from "antd";
import ChatHeader from "@/app/(Chat)/chat/_components/Chat/ChatHeader/ChatHeader";
import ChatWindow from "@/app/(Chat)/chat/_components/Chat/ChatWindow/ChatWindow";
import ChatFooter from "@/app/(Chat)/chat/_components/Chat/ChatFooter/ChatFooter";
import WithTheme from "@/styles/theme/WithTheme";

const Chat = () => {
  return (
    <WithTheme>
      <Layout style={{ height: "100%" }}>
        <ChatHeader />
        <ChatWindow />
        <ChatFooter />
      </Layout>
    </WithTheme>
  );
};

export default Chat;
