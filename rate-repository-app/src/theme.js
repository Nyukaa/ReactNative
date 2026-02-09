import { Platform } from "react-native";
const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",

    primary: "#0366d6",
    appBar: "#24292e",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  // fonts: {
  //   main: "System",
  // },
  // different fonts for different platforms
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System", //for web and other platforms
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
