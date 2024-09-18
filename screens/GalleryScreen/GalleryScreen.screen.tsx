import {
	DrawerContentComponentProps,
	createDrawerNavigator,
} from '@react-navigation/drawer';
import { Container, FormWrapper } from './GalleryScreen.style';
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';

import MenuScreen from '../../components/MenuScreen/MenuScreen.component';
import Header from '../../components/MyArtScreenComponent/HeaderComponent/Header.component';
import Art from '../../components/GalleryScreenComponent/Art/Art.component';

const Drawer = createDrawerNavigator()

const GalleryScreen = () => {

    const [fontLoaded, fontError] = useFonts({
        Poppins_700Bold,
    })

    if (!fontLoaded || fontError) {
        return (
            <></>
        )
    }


    return (
		<Container>
			<Header />
			<FormWrapper
				contentContainerStyle={{
					alignItems: 'center',
				}}
			>
				<Art />
			</FormWrapper>
		</Container>
	);
}

const DrawerContent = (props: DrawerContentComponentProps) => {
	return <MenuScreen {...props} />;
};

const Wrapper = () => {
	return (
		<Drawer.Navigator
			initialRouteName='Gallery'
			screenOptions={{
				drawerPosition: 'right',
				headerShown: false,
			}}
			drawerContent={(props) => <DrawerContent {...props} />}
		>
			<Drawer.Screen
				name='Gallery'
				component={GalleryScreen}
			/>
		</Drawer.Navigator>
	);
};

export default Wrapper