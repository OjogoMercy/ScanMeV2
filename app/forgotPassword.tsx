import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import general from "@/constants/General";
import { ThemedText } from "@/constants/ThemedText";
import { router } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  View,Image
} from "react-native";
import { Colors, FONTS, Sizes } from "../constants/theme";
import { images } from "@/assets/images";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");
  const submitData = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }else{
      router.push("/LoginScreen");

    }
  };

  return (
    <View style={[general.container, { backgroundColor: Colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <Text
        style={{
          ...FONTS.navTitle,
          color: Colors.primary,
          fontWeight: "bold",
          marginBottom: Sizes.padding * 2,
        }}
      >
        Forgot Password
      </Text>
      <Image source={images.emptyScan} style={{ height: "25%", width: "60%", resizeMode: "contain" }}/>
      <ThemedText
        style={{
          textAlign: "center",
          ...FONTS.h3,
          color: Colors.bodyText,
        }}
      >
        Forgot your password? Enter your email below and we'll send you a quick
        link to reset it.
      </ThemedText>
      <KeyboardAvoidingView style={styles.form} behavior="padding">
        <CustomInput
          label="Email"
          placeholder="Enter Your Email"
          value={email}
          onChangeText={setEmail}
          iconName="email"
        />

        

        <CustomButton title="Send Reset Link" onPress={submitData} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  form: {
    width: "100%",
    marginTop: Sizes.padding,
    padding: Sizes.padding,
    borderRadius: Sizes.radius,
  },
});
