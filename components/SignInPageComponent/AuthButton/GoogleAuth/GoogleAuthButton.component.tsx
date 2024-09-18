import * as WebBrowser from "expo-web-browser";
import { useOAuth, useUser } from "@clerk/clerk-expo";
import { UseWarmUpBrowser } from "../../../../hooks/useWarmUpBrowser";
import { ButtonWrapper, Icon } from "../AuthButton.style";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import db from "../../../../firebase-config";
import { useDispatch } from "react-redux";
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
} from "../../../../redux/reducer/AuthReducer";
import { Alert } from "react-native";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

const GoogleAuthBtnComponent = () => {
  UseWarmUpBrowser();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useUser();
  const { startOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });

  useEffect(() => {
    if (!user.user?.primaryEmailAddress?.emailAddress) {
      return;
    }
    async () => {
      try {
        const email = user.user?.primaryEmailAddress?.emailAddress;
        const docRef = doc(db, "users", email as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Docsnap Exist Called");
          const data = docSnap.data();
          dispatch(selectAuthenticated(true));
          dispatch(selectAuthType("google"));
          dispatch(selectEmailAddress(email));
          dispatch(selectFullname(data.fullName));
          dispatch(selectProfileImageUrl(data.profileImageUrl));
          dispatch(selectUsername(data.username));
          dispatch(selectBio(data.bio));
          dispatch(selectTwitter(data.twitter));
          dispatch(selectInstagram(data.instagram));
          dispatch(selectWebsite(data.website));
          navigation.navigate("Profile" as never);
        } else {
          console.log("no Such Documents");
        }
      } catch (error) {
        console.error("Failed to store user data:", error);
        return;
      }
    };
  }, [user]);

  const googleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
      } else {
        console.log("Logging Google Auth");
        console.log(createdSessionId);
        console.log(setActive);

        console.log("Failed To Sign In");
      }
    } catch (error) {
      Alert.alert(`Error Occured Try Again, ${error}`);
      console.log(error);
    }
  };

  return (
    <ButtonWrapper onPress={googleSignIn}>
      <Icon name="google" color="#fff" size={30} />
    </ButtonWrapper>
  );
};

export default GoogleAuthBtnComponent;
