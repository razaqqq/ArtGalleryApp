
import React from 'react'
import {
  ComponentWrapper,
  LinkText,
  LinkWrapper,
  PreText
} from './LogInLinkStyle.style'
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular
}
from '@expo-google-fonts/poppins'

import {
  NavigationProp,

} from '@react-navigation/native'

const LogInLinkCOmponent = ({ navigation } : {
  navigation: NavigationProp<ReactNavigation.RootParamList> |
  {
    navigate: Function
  } | undefined
}) => {

  
  const [fontLoaded, fontError] = useFonts({
    Poppins_300Light,
    Poppins_400Regular
  })

  if (!fontLoaded || fontError) {
    return (<></>)
  }

  return (
    <ComponentWrapper>
      <PreText>Already Have an Account ?</PreText>
      <LinkWrapper
        onPress={() => {
          navigation?.navigate('SignIn' as never)
        }}
      >
        <LinkText>Log In</LinkText>
      </LinkWrapper>
    </ComponentWrapper>
  )
}

export default LogInLinkCOmponent