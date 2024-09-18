import { View, Text } from 'react-native'
import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo' 
import { UseWarmUpBrowser } from '../../../../hooks/useWarmUpBrowser'
import { ButtonWrapper, Icon } from '../AuthButtonStyle.style'
import { useNavigation } from '@react-navigation/native'
import {doc, setDoc} from 'firebase/firestore'
import db from '../../../../firebase-config'
import { useDispatch } from 'react-redux'
import { 
  selectAuthType,
  selectAuthenticated,
  selectEmailAddress,
  selectFullname
} from '../../../../redux/reducer/AuthReducer'
WebBrowser.maybeCompleteAuthSession()

const AppleAuthBtn = () => {

  UseWarmUpBrowser()

  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { startOAuthFlow } = useOAuth({
    strategy: 'oauth_apple'
  }) 


  const appleSignUp = async () => {
    try{  
      const {createdSessionId, setActive, signUp} = await startOAuthFlow()
    
      if (createdSessionId && setActive) {
        setActive({
          session: createdSessionId
        })

        await setDoc(doc(db, 'users', signUp?.emailAddress as string), {
          fullName: '',
          emailAddress: signUp?.emailAddress,
          username: '',
          profileImageUrl: '',
          authType: 'apple',
          creationDate: new Date()

        })

        dispatch(selectAuthType('apple'))
        dispatch(selectAuthenticated(true))
        dispatch(selectEmailAddress(signUp?.emailAddress))
        dispatch(selectFullname(``))

        navigation.navigate("Profile" as never)

      }
      
    }
    catch(error) {
      console.log(error)
    }
  }

  return (
    <ButtonWrapper
      onPress={appleSignUp}
    >
      <Icon
        name='apple1'
        color='#fff'
        size={30}
      />
    </ButtonWrapper>
  )
}

export default AppleAuthBtn