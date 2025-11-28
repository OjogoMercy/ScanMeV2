import { images } from '@/assets/images'
import { Colors } from '@/constants/theme'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { Animated, StatusBar, StyleSheet, View ,Image} from 'react-native'
import { MotiView } from 'moti'

const Splash = () => {
const router = useRouter()
    useEffect(() => {
       
        const timer = setTimeout(() => {

            router.replace('/Onboarding1')
        },
            2000)
        return () => clearTimeout(timer)
    },[router])
  return (
      <View style={{ flex:1, backgroundColor:Colors.primary}}>
          <StatusBar barStyle='dark-content' backgroundColor={Colors.primary} />
          <MotiView
              from={{ translateY: -100, opacity: 0, scale: 0.9 }}
  animate={{ translateY: 0, opacity: 1, scale: 1 }}
              transition={{
                  type: "spring",
                  damping: 20,
                  stiffness:200
              }}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:Colors.primary}}
              
          >
          <Image source={images.Splash} style={{ height: '30%', width: '45%', resizeMode:'contain' }} />
              
          </MotiView>
              
              
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})