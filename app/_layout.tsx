import { Stack } from "expo-router";
import { Colors } from "@/constants/theme";

export default function RootLayout() {
  return <Stack screenOptions={{headerShown:false, animation:"slide_from_right",gestureEnabled:true}} initialRouteName="Splash"/>;
}
