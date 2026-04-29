import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import general from "@/constants/General";
import { ThemedText } from "@/constants/ThemedText";
import { auth } from "@/firebaseConfig";
import { router } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { Images } from "@/constants/Images";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors, FONTS, Sizes } from "../../constants/theme";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [emailSent, setEmailSent] = React.useState(false);

  const submitData = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      alert("Please enter your email");
      return;
    } else if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
      Alert.alert(
        "Email Sent",
        "Password reset link has been sent to your email. Please check your inbox (and spam folder).",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ],
      );
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
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
      <Image
        source={images.emptyScan}
        style={{ height: "25%", width: "60%", resizeMode: "contain" }}
      />
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
