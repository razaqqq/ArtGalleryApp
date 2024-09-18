
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import {
	Poppins_300Light,
	Poppins_400Regular,
	useFonts,
} from '@expo-google-fonts/poppins';  

import {
  FormComponentWrapper,
  InputComponent,
  InputErrorText,
  PasswordInputWrapper,
  SignInButton,
  SignInButtonText,
  Label
} from './FormComponent.style'

import { LinearGradient } from 'expo-linear-gradient';
import { useSignIn } from '@clerk/clerk-expo';
import { doc, getDoc } from 'firebase/firestore';
import db from '../../../firebase-config';
import { useDispatch } from 'react-redux';

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
} from '../../../redux/reducer/AuthReducer';

import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

const FormComponent = () => {

  const dispatch = useDispatch();
	const navigation = useNavigation();

  const [fontLoaded, fontError] = useFonts({
		Poppins_300Light,
		Poppins_400Regular,
	});

  const { isLoaded, signIn, setActive } = useSignIn();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [isFocusedEmail, setIsFocusedEmail] = useState(false);
	const [isFocusedPassword, setIsFocusedPassword] = useState(false);

	const [emailInputError, setEmailInputError] = useState('');
	const [passwordInputError, setPasswordInputError] = useState('');

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function validateData() {
		const emailPattern = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
		let valid = true;

		if (!emailPattern.test(email)) {
			setEmailInputError('Invalid email format');
			valid = false;
		}

		if (password.length < 8) {
			setPasswordInputError('Password must be at least 8 charcters long');
			valid = false;
		}

		return valid;
	}

  const onSignInPress = async () => {
    if (!validateData()) {
      return
    }

    if (!isLoaded) {
      return
    }

    try {

      await signIn.create({
        identifier: email,
        password
      })
      .then(async (result) => {
        if (result.status === 'complete') {
          setActive({ session: result.createdSessionId });
          const docRef = doc(db, 'users', email);
					const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
							dispatch(selectAuthenticated(true));
							dispatch(selectAuthType('email'));
							dispatch(selectEmailAddress(email));
							dispatch(selectFullname(data.fullName));
							dispatch(selectProfileImageUrl(data.profileImageUrl));
							dispatch(selectUsername(data.username));
							dispatch(selectBio(data.bio));
							dispatch(selectTwitter(data.twitter));
							dispatch(selectInstagram(data.instagram));
							dispatch(selectWebsite(data.website));
							navigation.navigate('Profile' as never);
          }
          else {
            console.log("No Such Document Exist")
          }

        }
        else {
          console.log(result.status)
        }
      })

    }
    catch(error) {
      Alert.alert(`Error Occured, Try Again`)
      console.log(error)
    }

  }

  if (!fontLoaded || fontError) {
    return (
      <></>
    )
  }

  return (
    <FormComponentWrapper>

      <Label>Email</Label>
      <InputComponent
        testID='emailInpuTestId'
				value={email}
				onChangeText={(email: string) => setEmail(email)}
				placeholder='artist@gmail.com'
				placeholderTextColor='#757575'
				onFocus={() => setIsFocusedEmail(true)}
				onBlur={() => setIsFocusedEmail(false)}
				isFocused={isFocusedEmail}
				style={{
					borderColor: isFocusedEmail ? '#A463F8' : '#fff',
					backgroundColor: isFocusedEmail ? '#000' : 'transparent',
				}}
      />
      {emailInputError && (
				<InputErrorText testID='emailInputError'>
					{emailInputError}
				</InputErrorText>
			)}

      <Label>Password</Label>
			<PasswordInputWrapper isFocused={isFocusedPassword}>
				<InputComponent
					testID='passwordInputTestId'
					value={password}
					onChangeText={(password: string) => setPassword(password)}
					placeholder='at least 8 characters'
					placeholderTextColor='#757575'
					secureTextEntry={!isPasswordVisible}
					onFocus={() => setIsFocusedPassword(true)}
					onBlur={() => setIsFocusedPassword(false)}
					isFocused={isFocusedPassword}
					style={{
						flex: 1,
						borderColor: 'transparent',
						backgroundColor: 'transparent',
						marginTop: 0,
					}}
				/>
				<TouchableOpacity
					style={{ padding: 10 }}
					onPress={() => setIsPasswordVisible(!isPasswordVisible)}
				>
					<Icon
						name={isPasswordVisible ? 'eye-with-line' : 'eye'}
						color='#fff'
						size={26}
					/>
				</TouchableOpacity>
			</PasswordInputWrapper>
			{passwordInputError && (
				<InputErrorText testID='passwordInputError'>
					{passwordInputError}
				</InputErrorText>
			)}

      <SignInButton onPress={onSignInPress}>
				<LinearGradient
					colors={['#B24E9D', '#7E3BA1']}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={{
						borderRadius: 8,
						flex: 1,
						justifyContent: 'center',
					}}
				>
					<SignInButtonText>Sign In</SignInButtonText>
				</LinearGradient>
			</SignInButton>

    </FormComponentWrapper>
  )
}

export default FormComponent