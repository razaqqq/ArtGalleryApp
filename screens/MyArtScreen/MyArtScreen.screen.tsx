import {
	DrawerContentComponentProps,
	createDrawerNavigator,
} from '@react-navigation/drawer';
import {
    ButtonText,
	MyArtScreenContainer,
	EditProfileOptions,
	FormWrapper,
	OptionsWrappers,
	ViewProfileOptions,
} from './MyArtScreen.style'
import { useState } from 'react';
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';
import MenuScreen from '../../components/MenuScreen/MenuScreen.component';
import Header from '../../components/MyArtScreenComponent/HeaderComponent/Header.component';
import ArtForm from '../../components/MyArtScreenComponent/ArtForm/ArtForm.component';
import MyArt from '../../components/MyArtScreenComponent/MyArt/MyArt.component';


const Drawer = createDrawerNavigator();


const MyArtScreen = () => {

    const [mode, setMode] = useState('view');
	const [fontLoaded, fontError] = useFonts({
		Poppins_700Bold,
	});

	if (!fontLoaded || fontError) {
		return null;
	}

    return (
        <MyArtScreenContainer>
			<Header />
            <FormWrapper
				contentContainerStyle={{
					alignItems: 'center',
				}}
			>
				<OptionsWrappers>
					<ViewProfileOptions
						onPress={() => setMode('view')}
						active={mode === 'view'}
					>
						<ButtonText>My Art</ButtonText>
					</ViewProfileOptions>
					<EditProfileOptions
						onPress={() => setMode('publish')}
						active={mode === 'publish'}
					>
						<ButtonText>Publish</ButtonText>
					</EditProfileOptions>
				</OptionsWrappers>
				{mode === 'publish' ? <ArtForm setMode={setMode}/> : <MyArt/>}
			</FormWrapper>
        </MyArtScreenContainer>
    )

}

const DrawerContent = (props: DrawerContentComponentProps) => {
	return <MenuScreen {...props} />;
};

const Wrapper = () => {
	return (
		<Drawer.Navigator
			initialRouteName='MyArt'
			screenOptions={{
				drawerPosition: 'right',
				headerShown: false,
			}}
			drawerContent={(props) => <DrawerContent {...props} />}
		>
			<Drawer.Screen
				name='MyArt'
				component={MyArtScreen}
			/>
		</Drawer.Navigator>
	);
};


export default Wrapper