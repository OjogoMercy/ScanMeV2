import { StyleSheet, Text, View,StatusBar, KeyboardAvoidingView } from 'react-native'
import React, { useState, } from 'react'
import general from '@/constants/General'
import { Colors, FONTS, Sizes } from '../constants/theme'
import { ThemedText } from '@/constants/ThemedText'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'

const ForgotPassword = () => {
    const [email, setEmail] = React.useState("");
const submitData = () => {
    if (!email) {
        alert("Please enter your email");
        return;
    }
}

  return (
    <View style={[general.container, {backgroundColor:Colors.background}]}>
       <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
           <Text
             style={{
               ...FONTS.navTitle,
               color: Colors.primary,
               fontWeight: "bold",
               marginVertical: Sizes.padding * 2,
             }}
           >
             Forgot Password
           </Text>
            <KeyboardAvoidingView style={styles.form} behavior="padding">
        <CustomInput
          label="Email"
          placeholder="Enter Your Email"
          value={email}
          onChangeText={setEmail}
          iconName="email"
        />
       
        <ThemedText
          type="text4"
          style={{
            marginTop: Sizes.padding * 0.5,
            marginLeft: "auto",
            color: Colors.primary,
          }}
          onPress={() => router.push("/forgotPassword")}
        >
          Forgot Password?
        </ThemedText>

        <CustomButton title="Send Reset Link" onPress={submitData} />
      </KeyboardAvoidingView>

    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
     form: {
    width: "100%",
    marginTop: Sizes.padding,
    padding: Sizes.padding,
    borderRadius: Sizes.radius,
  },
})