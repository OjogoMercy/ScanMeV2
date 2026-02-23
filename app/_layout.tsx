import { useAuth } from "@/hooks/useAuth";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import Splash from "./Splash";

export default function RootLayout() {
  const { loading, user } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    const inAuthScreens =
      segments[0] === "(authscreens)"

      if( user && !inAuthScreens && segments.length > 0  ){
        return;
    } else if (user && inAuthScreens) {
      router.replace("/(tabs)");
    } 
      

  }, [user,loading,segments]);
   if(loading){
      return<Splash/>
    }

  if (loading) {
    return null;
  } else {
    return (
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          gestureEnabled: true,
        }}
        initialRouteName="Splash"
      />
    );
  }
}
