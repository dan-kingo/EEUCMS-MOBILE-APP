import { MD3DarkTheme } from "react-native-paper";

export const darkTheme = {
  ...MD3DarkTheme,
  dark: true,
  roundness: 4,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#ff784b",
    secondary: "#c6635a",
    background: "#212121",
    surface: "#212121",
    text: "#f2f2f2",
    onSurface: "#f2f2f2",
    onBackground: "#f2f2f2",
  },
  fonts: {
    ...MD3DarkTheme.fonts,
    // Only override families if needed
    displayLarge: {
      ...MD3DarkTheme.fonts.displayLarge,
      fontFamily: "Palanquin-Regular",
    },
    bodyLarge: {
      ...MD3DarkTheme.fonts.bodyLarge,
      fontFamily: "Palanquin-Regular",
    },
    titleMedium: {
      ...MD3DarkTheme.fonts.titleMedium,
      fontFamily: "Palanquin-Medium",
    },
    labelSmall: {
      ...MD3DarkTheme.fonts.labelSmall,
      fontFamily: "Palanquin-Light",
    },
  },
};
