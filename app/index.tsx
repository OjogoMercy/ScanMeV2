import { StatusBar, Text, View ,Image, Pressable, TouchableOpacity} from "react-native";
import React from 'react';
import { Colors,Sizes,FONTS, SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants/Theme";
import CustomButton from "@/components/CustomButton";
import { Camera, useCameraPermissions, CameraType } from "expo-camera";  
import { Link } from "expo-router";
import general from "@/constants/General";

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
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <Text style={{ ...FONTS.h2 }}>Hey There!</Text>
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
      <View style={[general.row, {width:'60%'}]}>
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
