"use client";

import React from "react";
import styles from "../../../../../../../styles/Chat.module.css";
import { Avatar, Flex } from "antd";
import Image from "next/image";

const AvatarWithStatus = ({ status }: { status: "online" | "offline" }) => {
  return (
    <Flex style={{ position: "relative" }}>
      <Avatar style={{ background: "none", width: "32px", height: "32px" }}>
        <Image
          src={"/avatars/avatar2.png"}
          alt={"bot"}
          width={32}
          height={32}
        />
      </Avatar>
      <span
        className={`${styles.status} ${status === "online" ? styles.statusOnline : styles.statusOffline}`}
      ></span>
    </Flex>
  );
};

export default AvatarWithStatus;
