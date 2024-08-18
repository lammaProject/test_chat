"use client";

import React, { useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { useChat } from "@/app/(Chat)/chat/_hooks/useChat";
import styles from "../../../../../../../styles/Chat.module.css";
import { Flex, Input, Upload, UploadProps, Image, UploadFile } from "antd";
import { RcFile, UploadChangeParam } from "antd/es/upload";

const MessageInput = () => {
  const [text, setText] = useState("");

  const [imageSrc, setImageSrc] = useState("");

  const { sendMessage, pending } = useChat();

  const handleUpload = (info: UploadChangeParam<UploadFile<any>>) => {
    const { status } = info.file;

    if (status === "done") {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const imageDataUrl = e.target?.result as string;
        setImageSrc(imageDataUrl);
      };
      reader.readAsDataURL(info.file.originFileObj as RcFile);
    }
  };

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    accept: "image/*",
    onChange: handleUpload,
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      return isImage || Upload.LIST_IGNORE;
    },
  };

  const handleSend = () => {
    if ((text && text.trim()) || imageSrc) {
      sendMessage({ text, image: imageSrc || "" });
      setText("");
      setImageSrc("");
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Flex style={{ background: "white", padding: "8px 12px" }} align={"center"}>
      <SmileOutlined style={{ width: "16px", height: "16px" }} />
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={pending ? "Bot typing..." : "Start typing..."}
        className={styles.input}
      />

      <Flex align={"center"}>
        {imageSrc && (
          <Image
            src={imageSrc}
            alt="Uploaded"
            style={{ width: "20px", height: "20px", marginRight: "5px" }}
          />
        )}

        <Upload {...uploadProps}>
          <div
            className={styles.icon}
            style={{ width: "16px", height: "16px", marginRight: "10px" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 15.9991 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs />
              <path
                id="Icon"
                d="M4.74 2.37C4 2.79 3.36 3.36 2.84 4.04C2.32 4.72 1.94 5.49 1.71 6.31C1.27 7.98 1.5 9.75 2.36 11.25C3.23 12.74 4.65 13.83 6.31 14.28C7.98 14.72 9.75 14.49 11.24 13.63C11.42 13.53 11.62 13.51 11.8 13.57C11.99 13.62 12.15 13.74 12.25 13.91C12.34 14.08 12.37 14.28 12.32 14.47C12.28 14.66 12.16 14.82 11.99 14.92C10.48 15.8 8.72 16.15 6.99 15.93C5.26 15.71 3.65 14.93 2.4 13.71C1.15 12.49 0.34 10.89 0.08 9.17C-0.17 7.44 0.14 5.67 0.98 4.14C1.82 2.61 3.14 1.4 4.74 0.69C6.33 -0.02 8.12 -0.19 9.82 0.2C11.52 0.6 13.04 1.55 14.15 2.89C15.27 4.23 15.91 5.91 15.99 7.65C15.99 7.68 15.99 7.71 15.99 7.75L15.99 7.85C15.99 7.91 15.99 7.98 15.99 8.04L15.99 9.25C15.99 9.84 15.8 10.42 15.44 10.9C15.09 11.37 14.58 11.72 14.01 11.89C13.44 12.05 12.83 12.03 12.27 11.82C11.71 11.61 11.24 11.22 10.92 10.72C10.29 11.4 9.43 11.84 8.51 11.96C7.59 12.08 6.65 11.88 5.86 11.38C5.07 10.88 4.48 10.13 4.19 9.24C3.9 8.36 3.93 7.4 4.27 6.53C4.61 5.66 5.25 4.94 6.06 4.49C6.88 4.04 7.82 3.89 8.74 4.07C9.65 4.24 10.48 4.73 11.07 5.44C11.67 6.16 11.99 7.06 11.99 8L11.99 9.25C11.99 9.58 12.13 9.9 12.36 10.13C12.59 10.36 12.91 10.5 13.24 10.5C13.58 10.5 13.89 10.36 14.13 10.13C14.36 9.9 14.49 9.58 14.49 9.25L14.49 7.86C14.47 6.73 14.15 5.63 13.57 4.66C12.99 3.69 12.17 2.89 11.19 2.33C10.2 1.78 9.09 1.49 7.96 1.5C6.83 1.5 5.72 1.8 4.74 2.37L4.74 2.37ZM10.49 8C10.49 7.33 10.23 6.7 9.76 6.23C9.29 5.76 8.66 5.5 7.99 5.5C7.33 5.5 6.69 5.76 6.23 6.23C5.76 6.7 5.49 7.33 5.49 8C5.49 8.66 5.76 9.29 6.23 9.76C6.69 10.23 7.33 10.5 7.99 10.5C8.66 10.5 9.29 10.23 9.76 9.76C10.23 9.29 10.49 8.66 10.49 8Z"
                fill="#2C2C2E"
                fillOpacity="1.000000"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </Upload>

        <div
          onClick={handleSend}
          className={styles.icon}
          style={{
            width: "16px",
            height: "13px",
            opacity: text || imageSrc ? "1" : "0.7",
          }}
        >
          <svg width="16" height="13" viewBox="0 0 15.9562 13.7804" fill="none">
            <defs />
            <path
              id="Icon"
              d="M1.54 1.6L2.33 6.14L7.2 6.14C7.62 6.14 7.95 6.47 7.95 6.89C7.95 7.3 7.62 7.64 7.2 7.64L2.33 7.64L1.54 12.17L13.88 6.89L1.54 1.6ZM0.94 6.89L0.01 1.57C-0.06 1.14 0.08 0.7 0.39 0.39C0.78 0 1.36 -0.11 1.86 0.1L15.27 5.85C15.68 6.03 15.95 6.43 15.95 6.89C15.95 7.34 15.68 7.75 15.27 7.92L1.86 13.67C1.36 13.88 0.78 13.77 0.39 13.38C0.08 13.07 -0.06 12.63 0.01 12.2L0.94 6.89Z"
              fill="#2C2C2E"
              fillOpacity="1.000000"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </Flex>
    </Flex>
  );
};

export default MessageInput;
