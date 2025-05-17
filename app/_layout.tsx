import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper";
import { darkTheme } from "../theme";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Palanquin-Regular": require("../assets/fonts/Palanquin-Regular.ttf"),
    "Palanquin-Medium": require("../assets/fonts/Palanquin-Medium.ttf"),
    "Palanquin-Light": require("../assets/fonts/Palanquin-Light.ttf"),
    "Palanquin-Thin": require("../assets/fonts/Palanquin-Thin.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <PaperProvider theme={darkTheme}>
      <StatusBar backgroundColor="#212121" barStyle="light-content" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#212121",
          },
        }}
      />
    </PaperProvider>
  );
}
