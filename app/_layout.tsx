import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    MaterialSymbolsOutlined: require("react-native-material-symbols/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].ttf")
  });
  if (!fontsLoaded) return null;
  return <Stack />;
}
