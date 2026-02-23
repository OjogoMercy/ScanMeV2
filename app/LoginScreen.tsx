import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import general from "@/constants/General";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { images } from "../assets/images";
import { Colors, FONTS, Sizes } from "../constants/theme";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const submitData = async () => {
  if(!email || !password){
    alert("please fill all the fields");
    return;
  }
  try{
    await signInWithEmailAndPassword(auth, email, password);
    router.push("/(tabs)");
  }catch(error){
    alert(error.message);
  }
}

  return (
    <View style={[general.container, { backgroundColor: Colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <Text
        style={{
          ...FONTS.navTitle,
          color: Colors.primary,
          fontWeight: "bold",
          marginVertical: Sizes.padding * 2,
        }}
      >
        Sign In
      </Text>
      <Image
        source={images.Splash}
        style={{ height: "25%", width: "60%", resizeMode: "contain" }}
      />

      <KeyboardAvoidingView style={styles.form} behavior="padding">
        <CustomInput
          label="Email"
          placeholder="Enter Your Email"
          value={email}
          onChangeText={setEmail}
          iconName="email"
        />
        <CustomInput
          label="Password"
          placeholder="Enter Your Password"
          secure
          iconName="lock"
          value={password}
          onChangeText={setPassword}
        />

        <CustomButton title="Sign In" onPress={submitData} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  form: {
    width: "100%",
    marginTop: Sizes.padding,
    padding: Sizes.padding,
    borderRadius: Sizes.radius,
  },
});
