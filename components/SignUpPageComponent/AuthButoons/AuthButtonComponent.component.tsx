import { View, Text } from 'react-native'
import React from 'react'
import { Wrapper } from './AuthButtonStyle.style'
import AppleAuthBtn from './AppleAuthBtn/AppleAuthBtn.component'
import GoogleAuthBtn from './GoogleAuthBtn/GoogleAuthBtn.component'

const AuthButtonComponent = () => {
  return (
    <Wrapper>
      <AppleAuthBtn/>
      <GoogleAuthBtn />
    </Wrapper>
  )
}

export default AuthButtonComponent