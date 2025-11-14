import { images } from '@/assets/images'
import { Colors } from '@/constants/theme'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { Animated, StatusBar, StyleSheet, View } from 'react-native'


const Splash = () => {
    const fadeAnim = new Animated.Value(0)
    const imageOpacity = fadeAnim.interpolate({
        inputRange: [0,0.5, 1],
        outputRange: [0,1,1]
    })
    const imageTransformY = fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0]
    })
const router = useRouter()
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        const timer = setTimeout(() => {

            router.replace('/')
        },
            2000)
    },[router,fadeAnim])
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:Colors.primary }}>
        <StatusBar barStyle='dark-content' backgroundColor={Colors.primary} />
          <Animated.Image source={images.Splash} style={{ height: '25%', width: '50%', opacity: imageOpacity, transform: [{ translateY: imageTransformY }] }} />
              
              
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})