import { Stack } from "expo-router";
// import { useAuth } from "@/hooks/useAuth";

export default function RootLayout() {
  // const { loading, user } = useAuth()
  // if (loading) {
  //   return null;
  // } else {
    return <Stack screenOptions={{ headerShown: false, animation: "slide_from_right", gestureEnabled: true }} initialRouteName="Splash" />;
  // }
}
