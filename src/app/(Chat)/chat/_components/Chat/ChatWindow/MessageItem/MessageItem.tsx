"use client";

import React, { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import AvatarWithStatus from "../../ChatHeader/AvatarWithStatus/AvatarWithStatus";
import styles from "../../../../../../../styles/Chat.module.css";
import { useChat } from "@/app/(Chat)/chat/_hooks/useChat";
import { motion } from "framer-motion";
import { Flex, Image, Typography } from "antd";
import { Message } from "@/types/chat";

const MessageItem = ({ message }: { message: Message }) => {
  const { updateMessage, deleteMessage } = useChat();

  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState<{
    text: string;
    image: string | undefined;
  }>({
    text: message.text,
    image: message?.image || undefined,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (message.text !== edited.text || message.image !== edited.image) {
      updateMessage(message.id, edited);
    }
    setIsEditing(false);
  };

  const handleDeleteImage = () => {
    setEdited((prev) => ({ ...prev, image: undefined }));
  };

  const handleEndEdit = () => {
    setIsEditing(false);
    handleSave();
  };

  const handleDelete = () => {
    deleteMessage(message.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${styles.messageItem} ${message.isBot ? styles.botMessage : styles.userMessage}`}
    >
      {message.isBot && (
        <div style={{ marginRight: "15px" }}>
          <AvatarWithStatus status={"online"} />
        </div>
      )}
      <Flex
        vertical
        style={{
          borderRadius: message.isBot ? " 0 6px 6px 6px" : "6px 0 6px 6px",
          background: message.isBot ? "" : "#007AFF",
        }}
        className={styles.message}
      >
        <Flex vertical>
          {message.isBot && (
            <Flex align={"center"}>
              <Typography.Title
                style={{
                  marginTop: "0",
                  marginRight: "10px",
                  fontWeight: "600",
                  color: "#2C2C2E",
                }}
                level={4}
              >
                Bot
              </Typography.Title>
              <Typography.Title
                style={{ marginTop: "0", color: "#666668" }}
                level={5}
              >
                Product
              </Typography.Title>
            </Flex>
          )}

          {isEditing ? (
            <input
              style={{ marginBottom: "10px" }}
              type="text"
              value={edited.text}
              onChange={(e) =>
                setEdited((prev) => ({ ...prev, text: e.target.value }))
              }
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
              }}
            />
          ) : (
            <Typography.Title
              style={{
                marginTop: "0",
                fontWeight: "400",
                color: message.isBot ? "#2C2C2E" : "white",
              }}
              level={4}
            >
              {message.text}
            </Typography.Title>
          )}

          {edited.image && message.image && (
            <>
              {isEditing && (
                <CloseOutlined
                  className={styles.icon}
                  style={{ color: "red", marginLeft: "auto" }}
                  onClick={handleDeleteImage}
                />
              )}
              <Image alt={"addImage"} src={message.image} />
            </>
          )}

          <Typography.Title
            style={{
              marginTop: "0",
              marginLeft: "auto",
              fontWeight: "400",
              color: message.isBot ? "#666668" : "white",
            }}
            level={5}
          >
            {new Date(message.time).toLocaleTimeString(`en-US`, {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </Typography.Title>
        </Flex>

        {!message.isBot && (
          <Flex justify={"end"} style={{ marginTop: "5px" }}>
            {isEditing ? (
              <CheckOutlined
                style={{ marginRight: "5px", color: "white" }}
                className={styles.icon}
                onClick={handleEndEdit}
              />
            ) : (
              <EditOutlined
                style={{ marginRight: "5px", color: "white" }}
                className={styles.icon}
                onClick={handleEdit}
              />
            )}
            <DeleteOutlined
              className={styles.icon}
              style={{ color: "white" }}
              onClick={handleDelete}
            />
          </Flex>
        )}

        <div
          className={`${message.isBot ? styles.messageLeft : styles.messageRight}`}
        ></div>
      </Flex>
    </motion.div>
  );
};

export default MessageItem;
