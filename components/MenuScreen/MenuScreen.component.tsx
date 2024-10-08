import { Alert, TouchableOpacity, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import React from "react";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import {
  AccountIcon,
  GalleryIcon,
  HomeIcon,
  LinkText,
  LinkWrapper,
  LogutIcon,
  MenuContainer,
  MenuIcon,
} from "./MenuScreen.style";

import { useFonts, Poppins_300Light } from "@expo-google-fonts/poppins";
import { useDispatch } from "react-redux";
import { AuthType } from "../../redux/types/Auth";

import {
  selectAuthType,
  selectAuthenticated,
  selectBio,
  selectEmailAddress,
  selectFullname,
  selectInstagram,
  selectProfileImageUrl,
  selectTwitter,
  selectUsername,
  selectWebsite,
} from "../../redux/reducer/AuthReducer";

const MenuScreen = ({
  navigation,
}: {
  navigation:
    | DrawerNavigationHelpers
    | {
        closeDrawer: Function;
        navigate: Function;
      };
}) => {
  const [fontLoaded, fontError] = useFonts({
    Poppins_300Light,
  });
  const { isLoaded, signOut } = useAuth();
  const dispatch = useDispatch();

  if (!fontLoaded || fontError) {
    return <></>;
  }

  return (
    <MenuContainer>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <View></View>
        <TouchableOpacity
          onPress={() => {
            navigation.closeDrawer();
          }}
        >
          <MenuIcon source={require("../../assets/images/menu-close.png")} />
        </TouchableOpacity>
      </View>
      <LinkWrapper
        onPress={() => {
          navigation.navigate("Gallery");
        }}
      >
        <HomeIcon name="home" size={25} color="#fff" />
        <LinkText>Gallery</LinkText>
      </LinkWrapper>
      <LinkWrapper
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <AccountIcon name="account" size={25} color="#fff" />
        <LinkText>Profile</LinkText>
      </LinkWrapper>
      <LinkWrapper
        onPress={() => {
          navigation.navigate("MyArt");
        }}
      >
        <GalleryIcon name="image" size={25} color="#fff" />
        <LinkText>My art</LinkText>
      </LinkWrapper>
      <LinkWrapper
        onPress={() => {
          Alert.alert(
            "Log Out",
            "Are you sure you want to log out?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: () => {
                  signOut();
                  dispatch(selectAuthenticated(false));
                  dispatch(selectAuthType(AuthType.EMAIL));
                  dispatch(selectUsername(""));
                  dispatch(selectEmailAddress(""));
                  dispatch(selectProfileImageUrl(""));
                  dispatch(selectFullname(""));
                  dispatch(selectBio(""));
                  dispatch(selectTwitter(""));
                  dispatch(selectInstagram(""));
                  dispatch(selectWebsite(""));
                  navigation.navigate("Home");
                },
              },
            ],
            { cancelable: false }
          );
        }}
      >
        <LogutIcon name="log-out-outline" size={25} color="#fff" />
        <LinkText>Log out</LinkText>
      </LinkWrapper>
    </MenuContainer>
  );
};

export default MenuScreen;
