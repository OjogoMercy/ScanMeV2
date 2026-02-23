import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import general from "@/constants/General";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors, FONTS, Sizes } from "../constants/theme";
import { createUserWithEmailAndPassword, EmailAuthProvider } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { EmailAuthCredential, linkWithCredential } from "firebase/auth";

const LoginScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const submitData = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all the fields");
      
      return;
    } else if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      
      return;
    } 
    else {
      try{
        const credential =  EmailAuthProvider.credential (email,password); 
        await linkWithCredential(auth.currentUser, credential)
        alert("Account successfully upgraded! All your scans are saved.");
      }catch(error){
        if( error.code  === 'auth/email-already-in-use'){
          alert("This email is already registered")
        }else {
          alert(error.message);
        }

      }
      router.push("/(tabs)");
    }
    console.log(userData);
  };
  const userData = {
    name,
    email,
    password,
    confirmPassword,
  };


  return (
    <View style={[general.container, { backgroundColor: Colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <Text
        style={{
          ...FONTS.h1,
          color: Colors.primary,
          fontWeight: "bold",
          marginVertical: Sizes.padding,
        }}
      >
        Sign up
      </Text>
      <Text
        style={{
          textTransform: "capitalize",
          textAlign: "center",
          ...FONTS.h3,
          color: Colors.bodyText,
        }}
      >
        New here? Sign up and start your journey to make life easier.
      </Text>
      <KeyboardAvoidingView style={styles.form} behavior="padding">
        <CustomInput
          label="Name"
          placeholder="Enter Your Full Name"
          value={name}
          onChangeText={setName}
        />
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
        <CustomInput
          label="Confirm Password"
          placeholder="Re-enter Your Password"
          secure
          iconName="lock"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <CustomButton title="Sign Up" onPress={submitData} />
      </KeyboardAvoidingView>
      <Text></Text>
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
