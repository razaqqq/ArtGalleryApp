import React, { useState } from "react";
import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import {
  ButtonText,
  EditProfileOptions,
  FormWrapper,
  OptionsWrapper,
  ProfileContainer,
  ViewProfileOption,
} from "./ProfileScreen.style";

import { useNavigation } from "@react-navigation/native";
import { useFonts, Poppins_700Bold } from "@expo-google-fonts/poppins";
import HeaderComponent from "../../components/ProfileScreenComponent/Header/HeaderComponent.component";

import ProfilePreviewComponent from "../../components/ProfileScreenComponent/ProfilePreview/ProfilePreview.component";
import EditProfileForm from "../../components/ProfileScreenComponent/EditProfileForm/EditProfileForm.component";
import MenuScreen from "../../components/MenuScreen/MenuScreen.component";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Drawer = createDrawerNavigator();

const ProfileScreen = () => {
  const navigation = useNavigation();

  let userInfo = useSelector((state: RootState) => state.auth);

  console.log("Logging Profile Screen");
  console.log(userInfo);

  const [mode, setMode] = useState("view");
  const [fontLoaded, fontError] = useFonts({
    Poppins_700Bold,
  });

  if (!fontLoaded || fontError) {
    return <></>;
  }

  return (
    <ProfileContainer>
      <HeaderComponent />
      <FormWrapper
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <OptionsWrapper>
          <ViewProfileOption
            onPress={() => {
              setMode("view");
            }}
            active={mode === "view"}
          >
            <ButtonText>Profile</ButtonText>
          </ViewProfileOption>
          <EditProfileOptions
            onPress={() => {
              setMode("edit");
            }}
            active={mode === "edit"}
          >
            <ButtonText>Edit</ButtonText>
          </EditProfileOptions>
        </OptionsWrapper>
        {mode === "edit" ? (
          <EditProfileForm user={userInfo} />
        ) : (
          <ProfilePreviewComponent user={userInfo} />
        )}
      </FormWrapper>
    </ProfileContainer>
  );
};

const DrawerContent = (props: DrawerContentComponentProps) => {
  return <MenuScreen {...props} />;
};

const Wrapper = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      screenOptions={{
        drawerPosition: "right",
        headerShown: false,
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default Wrapper;
