import { View, Text } from 'react-native'
import {
  ArrowIcon,
  HeaderComponentWrapper,
  IconWrapper, 
  PageTitle,
  PlaceHolderView
} from './HeaderStyle.style'

import {
  Poppins_500Medium,
  useFonts
} from '@expo-google-fonts/poppins'

import { NavigationProp } from '@react-navigation/native'


const HeaderComponent = ({navigation} : {navigation: 
  NavigationProp<ReactNavigation.RootParamList> |
  {canGoBack: Function; goBack: Function;} |
  undefined
}) => {

  const [fontLoaded, fontError] = useFonts({
    Poppins_500Medium
  })

  if (fontError || !fontLoaded) {
    return (
      <></>
    )
  }

  return (
    <HeaderComponentWrapper>
      <IconWrapper
        onPress={() => {
          if (navigation?.canGoBack()) {
            navigation?.goBack()
          }
        }}
      >
        <ArrowIcon 
          name='left'
          color='#fff'
          size={24}
        />
       
      </IconWrapper>
      <PageTitle>
          Create Account
        </PageTitle>
      <PlaceHolderView/>
    </HeaderComponentWrapper>
  )
}

export default HeaderComponent