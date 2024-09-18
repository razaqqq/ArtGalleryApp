import { View, Text } from 'react-native'
import React from 'react'
import { Container } from './SignUpScreen.style'
import FormComponent from '../../components/SignUpPageComponent/Form/FormComponent.component'
import HeaderComponent from '../../components/SignUpPageComponent/Header/HeaderComponent.component'
import AuthButtonComponent from '../../components/SignUpPageComponent/AuthButoons/AuthButtonComponent.component'
import LogInLinkCOmponent from '../../components/SignUpPageComponent/LogInLink/LogInLinkCOmponent.component'
import { useNavigation } from '@react-navigation/native'

const SignUpScreen = () => {

  const navigation = useNavigation()

  return (
    <Container>
      <HeaderComponent navigation={navigation}/>
      <FormComponent />
      <AuthButtonComponent />
      <LogInLinkCOmponent navigation={navigation}/>
    </Container>
  )
}

export default SignUpScreen