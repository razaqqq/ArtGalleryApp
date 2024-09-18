
import * as WebBrowser from 'expo-web-browser'
import { useAuth, useOAuth } from '@clerk/clerk-expo'
import { UseWarmUpBrowser } from '../../../../hooks/useWarmUpBrowser'
import { ButtonWrapper, Icon } from '../AuthButtonStyle.style'
import { useNavigation } from '@react-navigation/native'
import { setDoc, doc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { 
  selectAuthType,
  selectAuthenticated,
  selectEmailAddress,
  selectFullname,

 } from '../../../../redux/reducer/AuthReducer'
import db from '../../../../firebase-config'
import {Alert} from 'react-native'


WebBrowser.maybeCompleteAuthSession()

const GoogleAuthBtn = () => {

  UseWarmUpBrowser()
  const dispacth = useDispatch()
  const navigation = useNavigation()
  const { startOAuthFlow } = useOAuth({
    strategy: 'oauth_google'
  })

  const googleSignUp = async () => {
    try{
      const {
        createdSessionId, setActive, signIn, signUp
      } = await startOAuthFlow()

      if (createdSessionId && setActive) {
        setActive({
          session: createdSessionId
        })

        try{
          await setDoc(doc(db, "users", signUp?.emailAddress as string), {
            fullName: `${signUp?.firstName} ${signUp?.lastName}`,
            emailAddress: signUp?.emailAddress,
            username: '',
            profileImageUrl: '',
            authType: 'google',
            creationDate: new Date()
          })
        }
        catch(error) {
          console.log('Failed to Store User Data', error)
          return
        }

    
        dispacth(selectAuthType('google'))
        dispacth(selectAuthenticated(true))
        dispacth(selectEmailAddress(signUp?.emailAddress))
        dispacth(selectFullname(`${signUp?.firstName} ${signUp?.lastName}`))

        navigation.navigate('Profile' as never)

      }
      else {
        Alert.alert('Error', 'Failed To SIgn Up')
      }
    } catch(error) {
      Alert.alert('Error Occured, Try Again')
      console.log(error)
    }
  }

  return (
    <ButtonWrapper
      onPress={googleSignUp}
    >
      <Icon
        name="google"
        color="#fff"
        size={30}
      />
    </ButtonWrapper>
  )
}

export default GoogleAuthBtn