import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors,FONTS,SCREEN_HEIGHT,SCREEN_WIDTH } from '../constants/Theme';
import { useNavigation } from 'expo-router';
const CustomHeader = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: "row" ,}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons
          name="arrow-circle-left"
          size={SCREEN_HEIGHT * 0.03}
          color={Colors.primary}
        />
      </TouchableOpacity>
      <Text
        style={{
          ...FONTS.h2,
          marginLeft: SCREEN_WIDTH * 0.26,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </View>
  );
}

export default CustomHeader

const styles = StyleSheet.create({})