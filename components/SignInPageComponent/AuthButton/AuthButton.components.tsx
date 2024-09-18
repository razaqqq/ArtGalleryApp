import { View, Text } from 'react-native'
import React from 'react'
import {
  AuthWrapper,
  ButtonWrapper,
  Icon
} from './AuthButton.style'
import GoogleAuthBtnComponent from './GoogleAuth/GoogleAuthButton.component'
import AppleAuthbtnComponent from './AppleAuth/AppleAuthBtnComponent'

const AuthButton = () => {
  return (
    <AuthWrapper>
      <GoogleAuthBtnComponent />
      <AppleAuthbtnComponent />
    </AuthWrapper>
  )
}

export default AuthButton