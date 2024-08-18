"use client";

import { ConfigProvider, Flex, Layout, Spin, ThemeConfig } from "antd";
import { ReactElement, useEffect, useState } from "react";
import darkTheme from "@/styles/theme/darkTheme";
import lightTheme from "@/styles/theme/lightTheme";
import deepMerge from "@/utils/deepMerge";
import { useChatStore } from "@/store/store";

const config: ThemeConfig = {
  components: {
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
      fontSize: 14,
      fontSizeHeading4: 14,
      fontSizeHeading5: 12,
    },
    Layout: {
      headerHeight: "auto",
      headerPadding: "17px 13px 15px 13px",
    },
  },
};

const WithTheme = ({ children }: { children: ReactElement }) => {
  const { theme } = useChatStore();

  const [isDarkMode, setIsDarkMode] = useState<null | boolean>(null);

  useEffect(() => {
    if (theme) {
      setIsDarkMode(theme === "Dark");
    }
  }, [theme]);

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setIsDarkMode(localStorage.getItem("theme") === "Dark");
    } else {
      const handleColorSchemeChange = (event: MediaQueryListEvent) => {
        setIsDarkMode(event.matches);
      };

      const colorSchemeQuery = window.matchMedia(
        "(prefers-color-scheme: dark)",
      );
      setIsDarkMode(colorSchemeQuery.matches);
      colorSchemeQuery.addEventListener("change", handleColorSchemeChange);

      return () => {
        colorSchemeQuery.removeEventListener("change", handleColorSchemeChange);
      };
    }
  }, []);

  return (
    <ConfigProvider
      theme={deepMerge(config, isDarkMode ? darkTheme : lightTheme)}
    >
      {isDarkMode !== null ? (
        children
      ) : (
        <Layout style={{ height: "100%", background: "white" }}>
          <Flex style={{ height: "100%" }} justify={"center"} align={"center"}>
            <Spin />
          </Flex>
        </Layout>
      )}
    </ConfigProvider>
  );
};

export default WithTheme;
