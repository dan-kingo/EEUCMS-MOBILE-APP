import { Stack } from "expo-router";
import { StatusBar, View, Platform } from "react-native";
import { PaperProvider } from "react-native-paper";
import { darkTheme } from "../theme";
import { useFonts } from "expo-font";
import FlashMessage from "react-native-flash-message";
import * as SystemUI from "expo-system-ui";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Palanquin-Regular": require("../assets/fonts/Palanquin-Regular.ttf"),
    "Palanquin-Medium": require("../assets/fonts/Palanquin-Medium.ttf"),
    "Palanquin-Light": require("../assets/fonts/Palanquin-Light.ttf"),
    "Palanquin-Thin": require("../assets/fonts/Palanquin-Thin.ttf"),
  });

  if (!fontsLoaded) return null;

  // Set bottom navigation bar color (only works on Android)
  if (Platform.OS === "android") {
    SystemUI.setBackgroundColorAsync("#000000");
  }

  return (
    <PaperProvider theme={darkTheme}>
      <View style={{ flex: 1, backgroundColor: "#181818" }}>
        <StatusBar backgroundColor="#000000" barStyle="light-content" />
        <FlashMessage position="top" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#212121",
            },
          }}
        />
      </View>
    </PaperProvider>
  );
}
