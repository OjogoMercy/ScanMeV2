import React from 'react'
import { Stack } from '@/.expo/types/router';

export default function authLayout() {
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