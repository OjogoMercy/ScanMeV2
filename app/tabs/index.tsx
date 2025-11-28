import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';



export default function TabLayout() {
  const tintColor = Colors.primary; // Use a color variable

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home" 
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'time' : 'time-outline'} color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings" 
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'settings' : 'settings-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}