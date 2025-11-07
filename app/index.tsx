import general from "@/constants/General";
import { useCameraPermissions } from "expo-camera";
import { Link } from "expo-router";
import React from 'react';
import { Image, StatusBar, Text, View } from "react-native";
import { Colors, FONTS, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes } from "../constants/theme";

export default function Index() {
  const [permission, requestPermissions] = useCameraPermissions();
  const permissionStatus = Boolean(permission?.granted);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.white,
        padding: Sizes.padding,
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={"transparent"} translucent />
      <Text style={{ ...FONTS.h1, color:Colors.primary,fontWeight:'bold', marginTop:Sizes.base }}>Hey There!</Text>
      <Text style={{ ...FONTS.body3a, textAlign: "center" }}>
        Your Files are not stable , they physically deteriorate overtime, Why
        not try to preserve them.
      </Text>
      <Image
        source={require("../assets/images/man.jpg")}
        style={{
          height: SCREEN_HEIGHT * 0.6,
          width: SCREEN_WIDTH * 0.8,
          resizeMode: "contain",
        }}
      />
      <View style={[ {width:'100%'}]}>
        <Link href={"/History"} style={general.button}>
          <Text style={general.buttonText}>History</Text>
        </Link>
        <Link href="/CameraScreen" style={general.button}>
          <Text style={general.buttonText}>Scan Me</Text>
        </Link>
      </View>
    </View>
  );
}
