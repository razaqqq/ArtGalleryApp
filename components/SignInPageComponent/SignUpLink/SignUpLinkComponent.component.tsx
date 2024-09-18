import { NavigationProp } from '@react-navigation/native'

import {
  LinkText,
  LinkWrapper,
  PreText,
  SignUpLinkWrapper
} from './SignUpLinkComponent.style'

import {
	useFonts,
	Poppins_300Light,
	Poppins_400Regular,
} from '@expo-google-fonts/poppins';

const SignUpLinkComponent = ({
  navigation
} : {
  navigation:
		| NavigationProp<ReactNavigation.RootParamList>
		| { navigate: Function }
		| undefined;
}) => {

  const [fontLoaded, fontError] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
  })

  if (!fontLoaded || fontError) {
    return (
      <></>
    )
  }

  return (
    <SignUpLinkWrapper>
      <PreText>Dont't Have an Account</PreText>
      <LinkWrapper
        onPress={() => {
          navigation?.navigate('SignUp' as never)
        }}
      >
        <LinkText>Sign Up</LinkText>
      </LinkWrapper>
    </SignUpLinkWrapper>
  )
}

export default SignUpLinkComponent