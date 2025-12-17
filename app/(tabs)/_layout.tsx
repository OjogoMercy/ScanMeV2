import { Ionicons } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";
import React from "react";
import { CameraIcon as CameraOutline } from "react-native-heroicons/outline";
import { CameraIcon } from "react-native-heroicons/solid";
import { Colors } from "../../constants/theme";

export default function TabLayout() {
  const tintColor = Colors.primary;

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
      
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "home-fill" : "home"}
              size={focused ? 26 : 24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="CameraScreen"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <CameraIcon color={color} size={30} />
            ) : (
              <CameraOutline color={color} size={24} />
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
              size={focused ? 30 : 24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
