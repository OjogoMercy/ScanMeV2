import { Animated, Image, StyleSheet, View,Text } from 'react-native'
import { images } from '@/assets/images'
import React, { useEffect } from 'react'
import {BlurView, BlurViewProps} from 'expo-blur'
import { Colors, FONTS } from '@/constants/theme'
import { useRouter } from 'expo-router'
import general from '@/constants/General'
const LoginScreen = () => {
  return (
    <View style ={general.container}>
      <Text style={{...FONTS.h1, color:Colors.primary}}>Sign up</Text>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})