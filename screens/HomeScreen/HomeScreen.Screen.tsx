import { StatusBar } from "expo-status-bar";


import { Container } from './HomeScreen.style'
import ScreenTitle from "../../components/HomeScreenComponents/ScreenTitle/ScreenTitle.Component";
import ImageContainer from "../../components/HomeScreenComponents/ImageContainer/ImageContainer.Components";

import BottomSide from "../../components/HomeScreenComponents/BottomSide/BottomSide.Components";

import {
  useFonts,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";



export default function HomeScreen() {

  const [fontsLoaded, fontError] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
    });
  
    if (fontError) {
      return <></>
    }

  return (
    <Container
      source={require("../../assets/images/home-page-background.png")}
      resizeMode="cover"
    >
      <ScreenTitle />
      <ImageContainer />
      <BottomSide />
      <StatusBar style="auto"/>
    </Container>
  );
}










