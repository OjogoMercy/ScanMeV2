import { images } from "@/assets/images";
import general from "@/constants/General";
import { Colors, FONTS, Sizes } from "@/constants/theme";
import Ionicon from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import React from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const Onboarding1 = () => {
  return (
    <View
      style={[
        general.container,
        {
          backgroundColor: Colors.background,
          alignItems: "center",
          padding: Sizes.padding,
        },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <Image
        source={images.Splash}
        style={{ height: "50%", width: "90%", resizeMode: "contain" }}
      />
      <Text
        style={{
          ...FONTS.h1,
          color: Colors.text,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: Sizes.padding,
        }}
      >
        Scan Smarter, Not Harder
      </Text>
      <Text
        style={{
          ...FONTS.body3,
          color: Colors.bodyText,
          textAlign: "center",
          marginTop: Sizes.padding,
        }}
      >
        Meet{" "}
        <Text
          style={{ fontWeight: "bold", color: Colors.primary, ...FONTS.body2 }}
        >
          Tiffy
        </Text>
        , we instantly recognize and categorize any data; URL'S, WIFI, Emails
        and more in a single tap{" "}
      </Text>
      <View
        style={[general.row, { marginTop: Sizes.navTitle * 3, width: "90%" }]}
      >
        <Link href={"/(tabs)"}>
          <Text
            style={{
              ...FONTS.body2,
              color: Colors.primary,
              fontWeight: "bold",
            }}
          >
            Skip
          </Text>
        </Link>
        <Link href={"/Onboarding2"} asChild>
          <TouchableOpacity>
            <Ionicon
              name="arrow-forward-circle"
              size={45}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Onboarding1;

const styles = StyleSheet.create({});
