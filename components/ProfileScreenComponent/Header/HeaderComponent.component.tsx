
import React from 'react'

import { useFonts,  Poppins_500Medium, } from '@expo-google-fonts/poppins';
import { 
    ArrowIcon,
    HeaderComponentWrapper,
    IconWrapper,
    MenuIcon,
    MenuIconWrapper
} from './HeaderComponent.style'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types'

import { Alert } from 'react-native';
const HeaderComponent = () => {

    const navigation = useNavigation<DrawerNavigationProp<any>>()

    const [fontLoaded, fontError] = useFonts({
        Poppins_500Medium,
    })


    if (!fontLoaded || fontError) {
        return (<></>)
    }

  return (
    <HeaderComponentWrapper>
        <IconWrapper
            onPress={() => {
               
                if (navigation?.canGoBack()) {
                    console.log("Go Back")
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
        <MenuIconWrapper
            onPress={() => {
                // navigation?.openDrawer()
                try {
                    console.log("Anjay")
                    navigation?.openDrawer()
                }
                catch(error) {
                    console.log(error)
                }
               
            }}
        >
            <MenuIcon
                source={require('../../../assets/images/menu-open.png') }
            />
        </MenuIconWrapper>
    </HeaderComponentWrapper>
  )
}

export default HeaderComponent