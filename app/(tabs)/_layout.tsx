import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';
import {CameraIcon as CameraOutline, HomeIcon as HomeOutline} from 'react-native-heroicons/outline'
import {CameraIcon,HomeIcon} from 'react-native-heroicons/solid'



export default function TabLayout() {
  const tintColor = Colors.primary; 

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        headerShown: false,
        tabBarStyle: { backgroundColor: "#90d5ff" ,},
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
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <HomeIcon color={color} size={30} />
            ) : (
              <HomeOutline color={color} size={24} />
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