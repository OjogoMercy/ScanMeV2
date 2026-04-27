import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Colors, Sizes } from "../../constants/theme";

export default function TabLayout() {
  const tintColor = Colors.primary;
  const iconContainerStyle = {
    height: Sizes.navTitle * 2,
    borderRadius: Sizes.padding * 2,
    width: Sizes.navTitle * 2,
    alignItems: "center",
    justifyContent: "center",

    zIndex: 10,
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        headerShown: false,
        animation: "fade",
        transitionSpec: {
          animation: "timing",
          config: {
            duration: 200,
          },
        },
        tabBarStyle: { height: Platform.OS === "android" ? 70 : 90 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="document-scanner"
              size={focused ? 24 : 26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ScanForText"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="qr-code-scanner"
              size={focused ? 24 : 26}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="History"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "time" : "time-outline"}
              color={color}
              size={focused ? 24 : 26}
            />
          ),
        }}
      />
    </Tabs>
  );
}
