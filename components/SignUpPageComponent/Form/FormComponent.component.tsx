import { View, Text, TouchableOpacity, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native'
import React from 'react'
import {
  Poppins_300Light,
  Poppins_400Regular
} from '@expo-google-fonts/poppins'
import {
  CheckBoxContainer,
  CheckBoxText,
  ConfirmInputText,
  CreateAccountButton,
  CreateAccountButtonText,
  FormComponentWrapper,
  Input,
  InputErrorText,
  Label,
  PasswordInputWrapper,
  VerivyAccountButtonText,
  VerivyButton
} from './FormStyle.style'
import {
  LinearGradient
} from 'expo-linear-gradient'
import {
  isEmailLinkError,
  useSignUp
} from '@clerk/clerk-expo'
import {
  doc, setDoc
} from 'firebase/firestore'
import db from '../../../firebase-config'
import { UseDispatch, useDispatch } from 'react-redux'
import { 
  selectAuthType, 
  selectAuthenticated,
  selectUsername,
  selectEmailAddress,
  selectFullname,
  selectProfileImageUrl
} from '../../../redux/reducer/AuthReducer'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'
import { useFonts } from '@expo-google-fonts/poppins'
import Icon from 'react-native-vector-icons/Entypo'


const FormComponent = () => {

  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [fontLoaded, fontError] = useFonts({
    Poppins_300Light,
    Poppins_400Regular
  })

  const {
    isLoaded, setActive, signUp
  } = useSignUp()

  const [email, setEmail] = React.useState('')
  const [fullName, setFullName] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [isFocusedEmail, setIsFocusedEmail] = React.useState(false)
  const [isFocusedFullName, setIsFocusedFullName] = React.useState(false)
  const [isFocusedPassword, setIsFocusedPassword] = React.useState(false)

  const [inpurtErrorEmail, setInputErrorEmail] = React.useState('')
  const [inputErrorFullName, setInputErrorFullName] = React.useState('')
  const [inputErrorPassword, setInputErrorPassword] = React.useState('')

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
  const [isChecked, setIsChecked] = React.useState(false)

  const [pendingVerivication, setPendingVerivication] = React.useState(false)
  const [code, setCode] = React.useState(['', '', '', '', '', ''])

  function validateData() {

    const emailPattern = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
		const fullNamePattern = /^[a-zA-Z\s]+$/;

    let valid = true

    if (!emailPattern.test(email)) {
      setInputErrorEmail('Invalid Email Format')
      valid = false
    }

    if (!fullNamePattern.test(fullName) || fullName.length < 3 || fullName.length > 50) {
      setInputErrorFullName('FullName Must Containt only Letter and have a length beetwen 3 and 50')
      valid = false
    }

    if (password.length < 8) {
      setInputErrorPassword('Password Must Be Atleast 8 char')
      valid = false
    }

    return valid

  }

  const onSignUpPress = async() => {
    if (!isChecked) {
      Alert.alert('You Must Agree Privacy Police')
      return
    }

    if (!validateData()) {
      return
    }

    if (!isLoaded) {
      return
    }

    try{
      await signUp.create(
        {
          emailAddress: email,
          password: password
        }
      )

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code'
      })

      setPendingVerivication(true)


    } catch(error) {
      Alert.alert(`Error', Error Occured, Try again1 ${error}`)
      console.log(error)
    }

  }

  const onPressVerivy = async() => {
    const completeSignUp = await signUp?.attemptEmailAddressVerification({
      code: code.join('')
    })

    
    if (setActive) {
      await setActive({
        session: completeSignUp?.createdSessionId
      })
      setPendingVerivication(false)
    }
    else {
      return
    }


 

    await setDoc(doc(db, 'users', email), {
      fullName,
      emailAddress: email,
      username: '',
      profileImageUrl: '',
      authType: 'email',
      creationDate: new Date(),
      bio: '',
      twitter: '',
      instagram: '',
      website: ''
    })

    dispatch(selectAuthType('email'))
    dispatch(selectAuthenticated(true))
    dispatch(selectEmailAddress(email))
    dispatch(selectFullname(fullName))

    navigation.navigate('Profile' as never)

  }

  if (!fontLoaded || fontError) {
    return (
      <></>
      )
  }

  return (
    <FormComponentWrapper>
        <Label>
          Email
        </Label>
        <Input 
          testID='emailInputTestID'
          editable={!pendingVerivication}
          value={email}
          onChangeText={(emailVal: string) => setEmail(emailVal)}
          placeholder='artist@gmail.com'
          placeholderTextColor={'#757575'}
          onFocus={() => setIsFocusedEmail(true)}
          onBlur={() => setIsFocusedEmail(false)}
          isFocused={isFocusedEmail}
          style={{ 
            borderColor: isFocusedEmail ? '#A463F8' : '#fff',
            backgroundColor: isFocusedEmail ? "#000" : "transparent"
           }}
        />
        {
          inpurtErrorEmail && <InputErrorText
            testID='emailInputErrorTestID'
          >
            {inpurtErrorEmail}
          </InputErrorText>
        }

        <Label>
          FullName
        </Label>
        <Input 
          testID='fullNameInputTestID'
          editable={!pendingVerivication}
          value={fullName}
          onChangeText={(fullNameVal: string) => setFullName(fullNameVal)}
          placeholder='Your FullName'
          placeholderTextColor={'#757575'}
          onFocus={() => setIsFocusedFullName(true)}
          onBlur={() => setIsFocusedFullName(false)}
          isFocused={isFocusedEmail}
          style={{ 
            borderColor: isFocusedFullName ? '#A463F8' : '#fff',
            backgroundColor: isFocusedFullName ? "#000" : "transparent"
           }}
        />
        {
          inputErrorFullName && <InputErrorText
            testID='fullNameInputErrorTestID'
          >
            {inputErrorFullName}
          </InputErrorText>
        }

        <Label>Password</Label>
        <PasswordInputWrapper
          isFocused={isFocusedPassword}
        >
          <Input 
            testID='passwordInputTestID'
            editable={!pendingVerivication}
            value={password}
            onChangeText={(passwordVal: string) => setPassword(passwordVal)}
            placeholder='At Least 8 Character'
      
            placeholderTextColor={'#757575'}
            secureTextEntry={!isPasswordVisible}
            onFocus={() => setIsFocusedPassword(true)}
            onBlur={() => setIsFocusedPassword(false)}
            isFocused={isFocusedPassword}
            style={{ 
              flex: 1,
              borderColor: 'transparent',
              backgroundColor: 'transparent',
              marginTop: 0
            }}
          />
          <TouchableOpacity
            style={{
              padding: 10
            }}
            onPress={() => {
              setIsPasswordVisible(!isPasswordVisible)
            }}
          >
            <Icon 
              name={
                isPasswordVisible ? 'eye-with-line' : 'eye'
              }
              color='#fff'
              size={26}
            />
          </TouchableOpacity>
        </PasswordInputWrapper>
        {
          inputErrorPassword && <InputErrorText
           testID='passwordInputErrorTestID'
          >
            {inputErrorPassword}
          </InputErrorText>
        }
        <CheckBoxContainer>
          <TouchableOpacity
            testID='CheckboxTestId'
            onPress={() => {
              setIsChecked(!isChecked)
            }}
          >
            <View
              style={
                {
                  height: 24,
                  width: 24,
                  backgroundColor: isChecked ? '#A463F8' : '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5
                }
              }
            >
              {
                isChecked && (
                  <Icon 
                    name='check'
                    size={20}
                    color='#fff'
                  />
                )
              }
            </View>
          </TouchableOpacity>
          <CheckBoxText>
            I have read and agree to Terms of Use and Privacy policy
          </CheckBoxText>
        </CheckBoxContainer>

        {
          pendingVerivication ? (
            <View
              style={{ 
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'center' 
               }}
            >
              <View
                style={{ 
                  flexDirection: 'row',
                  marginBottom: 20,

                 }}
              >
                {
                  code.map((codePart, index) => (
                    <ConfirmInputText 
                      key={index}
                      value={codePart}
                      keyboardType='numeric'
                      maxLength={1}
                      onChangeText={(text: string) => {
                        const newCode = [
                          ...code
                        ]
                        newCode[index] = text
                        setCode(newCode)
                        if (text && index < code.length - 1) {
                          (
                            this?.[`input${index + 1}`] as unknown as TextInput
                          )?.focus()
                        } 
                        else if (text === '' && index > 0) {
                          (
                            this?.[`input${index - 1}`] as unknown as TextInput
                          )?.focus();
                        }
                      }}  
                      onKeyPress={({nativeEvent} : NativeSyntheticEvent<TextInputKeyPressEventData>) => {
                        if (nativeEvent.key === 'Backspace' && codePart === '') {
                          if (index > 0) {
                            const newCode = [
                              ...code
                            ];
                            newCode[index - 1] = '';
                            setCode(newCode);
                            (
                              this?.[`input${index - 1}`] as unknown as TextInput
                            )?.focus()
                          }
                        }
                      }}

                      // @ts-ignore
                      ref = {(ref: any) => ((this as any)[`input${index}`] = ref )}

                    />
                  ))
                }
              </View>
              <VerivyButton
                onPress={onPressVerivy}
              >
                <LinearGradient
                  colors={[
                  '#B24E9D', '#7E3BA1'
                  ]}
                  start={{
                    x: 0, y: 0
                  }}
                  end={{ 
                    x: 1, y: 1
                  }}
                  style={{ 
                    borderRadius: 8,
                    flex: 1,
                    justifyContent: 'center'
                  }}
                >
                  <VerivyAccountButtonText>
                    Verivy Email
                  </VerivyAccountButtonText>
                </LinearGradient>
              </VerivyButton>
            </View>
        
          ) : (
            <CreateAccountButton
              onPress={onSignUpPress}
            >
              <LinearGradient
                colors={[
                  '#B24E9D', '#7E3BA1'
                ]}
                start={{
                  x: 0, y: 0
                }}
                end={{ 
                  x: 1, y: 1
                 }}
                style={{ 
                  borderRadius: 8,
                  flex: 1,
                  justifyContent: 'center'
                }}
              >
                <CreateAccountButtonText>
                  Create Account
                </CreateAccountButtonText>
              </LinearGradient>
            </CreateAccountButton>
          )
        }

    </FormComponentWrapper>
    )
}

export default FormComponent