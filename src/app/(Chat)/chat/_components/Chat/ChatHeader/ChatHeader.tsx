"use client";

import { Header } from "antd/es/layout/layout";
import { Avatar, Col, Dropdown, Flex, MenuProps, Row } from "antd";
import Title from "antd/es/typography/Title";
import { EllipsisOutlined } from "@ant-design/icons";
import { useChat } from "@/app/(Chat)/chat/_hooks/useChat";

const items: MenuProps["items"] = [
  {
    key: "Light",
    label: "Light",
  },
  {
    key: "Dark",
    label: "Dark",
  },
];

const ChatHeader = () => {
  const { setTheme, pending } = useChat();

  const handleSelectTheme = (value: any) => {
    localStorage.setItem("theme", value.key);
    setTheme(value.key);
  };

  return (
    <Header>
      <Row align={"middle"}>
        <Col span={8}>
          <Avatar.Group>
            <Avatar src="/avatars/avatar1.png" />
            <Avatar src="/avatars/avatar2.png" />
            <Avatar src="/avatars/avatar3.png" />
            <Avatar src="/avatars/avatar4.png" />
          </Avatar.Group>
        </Col>

        <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
          <Flex vertical>
            <Title style={{ marginTop: "0" }} level={4}>
              🦄 Team Unicorns
            </Title>
            <Title style={{ textAlign: "center" }} type={"secondary"} level={5}>
              {pending ? "Bot typing..." : "last seen 45 minutes ago"}
            </Title>
          </Flex>
        </Col>

        <Col span={8}>
          <Flex justify={"end"}>
            <Dropdown menu={{ items, onClick: handleSelectTheme }}>
              <EllipsisOutlined
                style={{ fontSize: "20px", cursor: "pointer" }}
              />
            </Dropdown>
          </Flex>
        </Col>
      </Row>
    </Header>
  );
};

export default ChatHeader;
