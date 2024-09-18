import { View, Text } from 'react-native'
import React from 'react'


import {
  TouchableOpacity,
} from "react-native";

import {
  Container,
  IntroTextStyle,
  LogInBtn,
  LogInBtnText
} from './BottomSide.Styles'
import { useNavigation } from '@react-navigation/native';

const BottomSide = () => {

  const navigation = useNavigation()

  return (
    <Container>
      <IntroTextStyle>Become an Artist or Collector</IntroTextStyle>
    <TouchableOpacity
      onPress={
        () => {
          navigation.navigate("SignIn" as never)
        }
      }
    >
        <LogInBtn
          colors={["#B24E9D", "#7E3BA1"]}
          start={{ x: 0, y: 0 }}

          end={{ x: 1, y: 1 }}
        >
          <LogInBtnText>Log In</LogInBtnText>
        </LogInBtn>
      </TouchableOpacity>
      <TouchableOpacity>
        <LogInBtn
          colors={["#7E3BA1", "#B24E9D"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <LogInBtnText
            onPress={() => {
              navigation.navigate('SignUp' as never)
            }}
          >Create Account</LogInBtnText>
        </LogInBtn>
      </TouchableOpacity>  
    </Container>
  )
}



export default BottomSide