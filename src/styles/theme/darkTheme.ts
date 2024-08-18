import { theme, ThemeConfig } from "antd";

const darkTheme: ThemeConfig = {
  algorithm: theme.compactAlgorithm,
  token: {
    colorTextBase: "DA7B93",
  },
  components: {
    Typography: {
      colorTextBase: "#DA7B93",
      algorithm: true,
    },
    Avatar: {
      groupBorderColor: "#2F4454",
    },
    Spin: {
      colorPrimary: "white",
    },
    Dropdown: {
      colorTextBase: "red",
      colorText: "red",
    },
    Layout: {
      headerBg: "#2F4454",
      bodyBg: "#1C3334",
    },
  },
};

export default darkTheme;
