import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import general from '@/constants/General'
import { Colors } from '../constants/theme'

const forgotPassword = () => {
  return (
    <View style={[general.container, {backgroundColor:Colors.background}]}>
      <Text>forgotPassword</Text>
    </View>
  )
}

export default forgotPassword

const styles = StyleSheet.create({})