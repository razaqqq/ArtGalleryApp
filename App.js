import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen/HomeScreen.Screen";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ClerkProvider } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import SignUpScreen from "./screens/SignUpScreen/SignUpScreen.screen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen.screen";
import SignInScreen from "./screens/SignInScreen/SignInScreen.screen";
import MyArtScreen from "./screens/MyArtScreen/MyArtScreen.screen";
import GalleryScreen from "./screens/GalleryScreen/GalleryScreen.screen";
import { StripeProvider } from "@stripe/stripe-react-native";
import ArtScreen from "./screens/ArtScreen/ArtScreen.screen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StripeProvider
      publishableKey={Constants.expoConfig.extra.stripePublishableKey}
    >
      <ClerkProvider
        publishableKey={Constants.expoConfig.extra.clerkPublishableKey}
      >
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  title: "",
                  headerTransparent: true,
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                  title: "",
                  headerTransparent: true,
                  headerBackVisible: false,
                }}
              />
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                  title: "",
                  headerTransparent: true,
                  headerBackVisible: false,
                }}
              />
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  title: "",
                  headerTransparent: true,
                  headerBackVisible: false,
                }}
              />
              <Stack.Screen
                name="MyArt"
                component={MyArtScreen}
                options={{
                  title: "",
                  headerTransparent: true,
                  headerBackVisible: false,
                }}
              />
              <Stack.Screen
                name="Gallery"
                component={GalleryScreen}
                options={{
                  title: "",
                  headerTransparent: true,
                  headerBackVisible: false,
                }}
              />
              <Stack.Screen
                name="Art"
                component={ArtScreen}
                options={{
                  title: "",
                  headerTransparent: true,
                  headerBackVisible: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </ClerkProvider>
    </StripeProvider>
  );
}
