import { StyleSheet, Text, View , Image, StatusBar} from 'react-native'
import React from 'react'
import general from '@/constants/General'
import { Colors, FONTS } from '@/constants/theme'
import { images } from '@/assets/images'

const Onboarding1 = () => {
  return (
      <View style={[general.container, { backgroundColor: Colors.background }]}>
          <StatusBar barStyle='dark-content' backgroundColor={Colors.background} />
          <Image source={ images.mascotScan} style={{height:'45%', width:'35%', resizeMode:'contain'}} />
      <Text style={{...FONTS.h1, color:Colors.primary2}}>Scan Smarter, Not Harder</Text>
    <Text style={{...FONTS.body3, color:Colors.primary2}}>Meet Tiffy, we instantly recognize and categorize any data; URL'S, WIFI, Emails and more in a single tap </Text>
      </View>
  )
}

export default Onboarding1

const styles = StyleSheet.create({})