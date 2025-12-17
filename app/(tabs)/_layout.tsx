import { Ionicons } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import { CameraIcon as CameraOutline } from "react-native-heroicons/outline";
import { CameraIcon } from "react-native-heroicons/solid";
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
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                iconContainerStyle,
                {
                  backgroundColor: focused ? Colors.offWhite : Colors.offWhite,
                  borderRadius: Sizes.padding * 2,
                },
              ]}
            >
              {focused ? (
                <CameraIcon color={color} size={30} />
              ) : (
                <CameraOutline color={color} size={24} />
              )}
            </View>
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
