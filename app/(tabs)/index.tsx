import general from "@/constants/General";
import { useCameraPermissions } from "expo-camera";
import { Link } from "expo-router";
import React from 'react';
import { Image, ImageBackground, StatusBar, StyleSheet, Text, View } from "react-native";
import { Colors, FONTS, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes } from "../../constants/theme";

export default function Index() {
  const [permission, requestPermissions] = useCameraPermissions();
  const permissionStatus = Boolean(permission?.granted);
  return (
    <ImageBackground
      source={{
        uri: "https://cdn.promptden.com/images/7061bfbd-8009-4dc6-a0f7-0238a959e04c.webp",
      }}
      imageStyle={{ ...StyleSheet.absoluteFillObject }}
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.background,
        padding: Sizes.padding,
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={"transparent"}
        translucent
      />
      <View style={{backgroundColor:'rgba(0, 0, 0, 0.1)' , ...StyleSheet.absoluteFillObject}}>
        <Text
          style={{
            ...FONTS.h1,
            color: Colors.text,
            fontWeight: "bold",
            marginTop: Sizes.padding,
          }}
        >
          Hey There!
        </Text>
        <Text
          style={{
            ...FONTS.body3a,
            textAlign: "center",
            color: Colors.bodyText,
          }}
        >
          Your Files are not stable , they physically deteriorate overtime, Why
          not try to preserve them.
        </Text>
        <Image
          source={require("../../assets/images/man.jpg")}
          style={{
            height: SCREEN_HEIGHT * 0.6,
            width: SCREEN_WIDTH * 0.8,
            resizeMode: "contain",
          }}
        />
      </View>
    </ImageBackground>
  );
}
