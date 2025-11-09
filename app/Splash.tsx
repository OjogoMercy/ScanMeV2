import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { images } from '@/assets/images'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Theme'

const Splash = () => {
const router = useRouter()
//     useEffect(() => {
//         const timer = setTimeout(() => {

// router.replace('./LoginScreen')}, 3000)
//     },[router])
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:Colors.primary }}>
          <Image source={images.splash} style={{ height:'25%', width:'50%'}} />
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})