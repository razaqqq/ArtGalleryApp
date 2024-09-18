import { View, Text } from 'react-native'
import React from 'react'

import { 
  ArrowIcon,
  HeaderComponentWrapper,
  IconWrapper,
  PageTitleComponent,
  PlaceHolderView
} from "./HeaderComponent.style"

import { Poppins_500Medium, useFonts } from '@expo-google-fonts/poppins';
import { NavigationProp } from '@react-navigation/native';

const HeaderComponent = ({
  navigation 
} : {
  navigation : 
  | NavigationProp<ReactNavigation.RootParamList>
  | { canGoBack: Function; goBack: Function; }
  | undefined

}) => {

  const [fontLoaded, fontError] = useFonts({
    Poppins_500Medium
  })

  if (!fontLoaded || fontError) {
    return (<></>)
  }

  return (
    <HeaderComponentWrapper>
      <IconWrapper
        onPress={() => {
					if (navigation?.canGoBack()) {
						navigation?.goBack();
					}
				}}
      >
        <ArrowIcon 
          name='left'
					color='#fff'
					size={24}
        />
      </IconWrapper>
      <PageTitleComponent>Sign In</PageTitleComponent>
      <PlaceHolderView />
    </HeaderComponentWrapper>
  )
}

export default HeaderComponent
