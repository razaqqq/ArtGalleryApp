import { View, Text } from 'react-native'
import React from 'react'
import { Container } from './SignInScreen.style'
import HeaderCOmponent from '../../components/SignInPageComponent/Header/HeaderCOmponent.component'
import FormComponent from '../../components/SignInPageComponent/FormComponent/FormComponent.component'
import AuthButton from '../../components/SignInPageComponent/AuthButton/AuthButton.components'
import SignUpLinkComponent from '../../components/SignInPageComponent/SignUpLink/SignUpLinkComponent.component'
import { useNavigation } from '@react-navigation/native'


const SignInScreen = () => {

  const navigation = useNavigation()

  return (
    <Container>
      <HeaderCOmponent navigation={navigation} />
      <FormComponent />
      <AuthButton />
      <SignUpLinkComponent navigation={navigation} />
    </Container>
  )
}

export default SignInScreen