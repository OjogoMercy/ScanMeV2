import CustomInput from '@/components/CustomInput'
import general from '@/constants/General'
import { BlurView } from 'expo-blur'
import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { Colors, FONTS, Sizes } from '../constants/theme'
import CustomButton from '@/components/CustomButton'
import { useRouter } from 'expo-router'
const LoginScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const router = useRouter()
    const submitData = () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill all the fields')
            return            
        } else if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match')
            return
    }else{router.push('/')}
}
    const userData = {
    name,
    email,
    password,
    confirmPassword
    }
  return (
      <View style={[general.container, { backgroundColor: Colors.background }]}>
          <StatusBar barStyle='dark-content' backgroundColor={Colors.background} />
          <Text style={{ ...FONTS.h1, color: Colors.primary }}>Sign up</Text>
          <Text style={{ textTransform: 'capitalize', textAlign: 'center', ...FONTS.h3, color: Colors.primary2}}>New here? Sign up and start your journey to make life easier.</Text>
                   <KeyboardAvoidingView style={styles.form} behavior='padding'>
              <CustomInput label='Name' placeholder='Enter Your Full Name' value={name} onChangeText={setName} />
              <CustomInput label='Email' placeholder='Enter Your Email' value={email} onChangeText={setEmail} iconName='email' />
              <CustomInput label='Password' placeholder='Enter Your Password' secure iconName='lock' value={password} onChangeText={setPassword} />
                <CustomInput label='Confirm Password' placeholder='Re-enter Your Password' secure iconName='lock' value={confirmPassword} onChangeText={setConfirmPassword} />
          <CustomButton title='Sign Up' onPress={submitData } />
                    </KeyboardAvoidingView>
      </View>
    
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    form: {
    width: '100%',
marginTop: Sizes.padding,
    padding: Sizes.padding,
    borderRadius: Sizes.radius,
    }
})