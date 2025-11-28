import { StyleSheet, Text, View , Image, StatusBar, TouchableOpacity} from 'react-native'
import React from 'react'
import general from '@/constants/General'
import { Colors, FONTS, Sizes } from '@/constants/theme'
import { images } from '@/assets/images'
import Ionicon  from '@expo/vector-icons/Ionicons'
import { Link } from 'expo-router'
const Onboarding3 = () => {
  return (
      <View style={[general.container, { backgroundColor: Colors.background , alignItems:'center', padding:Sizes.padding}]}>
          <StatusBar barStyle='dark-content' backgroundColor={Colors.background} />
          <Image source={ images.mascotScan} style={{height:'40%', width:'70%',resizeMode:'contain'}} />
          <Text style={{ ...FONTS.h1, color: Colors.text, fontWeight: 'bold', textAlign:'center', marginTop:Sizes.padding}}>Never Lose A Scan</Text>
    <Text style={{...FONTS.body3, color:Colors.bodyText, textAlign:"center", marginTop:Sizes.padding}}>We built this for speed and comfort. Get instant confirmation with haptic feedback and use the built-in flashlight for scanning in any light condition.</Text>
          <View style={[general.row, { marginTop: Sizes.navTitle * 3, width: '90%', }]}>
              <Link href={'/(tabs)'}>
              <Text style={{ ...FONTS.body2, color: Colors.primary, fontWeight: 'bold' }}>Skip</Text>
                   </Link>
              <Link href={'/Onboarding3'} asChild>
                   <TouchableOpacity>
              <Ionicon name="arrow-forward-circle" size={45} color={Colors.primary} />
                  
              </TouchableOpacity>
              </Link>
             
    </View>
      </View>
  )
}

export default Onboarding3

const styles = StyleSheet.create({})