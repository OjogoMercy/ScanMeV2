import general from '@/constants/General'
import { Colors, FONTS } from '@/constants/theme'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
const LoginScreen = () => {
  return (
    <View style ={[general.container, {backgroundColor:Colors.background}]}>
          <Text style={{ ...FONTS.h1, color: Colors.primary }}>Sign up</Text>
          <Text style={{ textTransform: 'capitalize', textAlign: 'center', ...FONTS.h3, color: Colors.primary2}}>New here? Sign up and start your journey to make life easier.</Text>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})