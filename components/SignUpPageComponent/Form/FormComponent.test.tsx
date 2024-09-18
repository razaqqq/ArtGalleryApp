


import { fireEvent, render, waitFor } from "../../../test-utils";
import FormComponent from "./FormComponent.component";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useSignUp } from "@clerk/clerk-expo";
import { Alert } from 'react-native'

jest.mock('expo-font');
jest.mock('expo-asset');

jest.mock('@expo-google-fonts/poppins', () => ({
	useFonts: jest.fn().mockReturnValue([true, null])
}))

jest.mock('react-native', () => {
    const reactNative = jest.requireActual('react-native')

    reactNative.Alert.alert = jest.fn()

    return reactNative

})


jest.mock('firebase/firestore', () => ({
    doc: jest.fn(),
    setDoc: jest.fn(),
    getFirestore: jest.fn(),

}))

jest.mock('firebase/compat/app', () => ({
	apps: [],
	initializeApp: jest.fn()
}))

jest.mock('firebase/compat/storage', () => {})

jest.mock('firebase/app', () => ({
    initializeApp: jest.fn(),

}))

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn()
}))



jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn()
}))


jest.mock('@clerk/clerk-expo', () => ({
    useSignUp: jest.fn()
}))




describe('FormComponent Test', () => {
    it('Should display an error message when email address is in an invalid format', async () => {
        (useSignUp as jest.Mock).mockImplementation(() => ({
            isLoaded: true,
            signUp: {
                create: jest.fn()
            }
        }));
        const { findByTestId, getByTestId } = render(<FormComponent />);

        const emailInput = await findByTestId('emailInputTestID');
        fireEvent.changeText(emailInput, 'invalidemail')
    
        const checkBox = await findByTestId('CheckboxTestId')
        fireEvent.press(checkBox)

        const createAccountButton = await findByTestId("createAccountButtonTestID")
        fireEvent.press(createAccountButton)

        await waitFor(() => {
            expect(getByTestId('emailInputErrorTestID')).toBeTruthy()
        })

    })

    it('should display an error message when fullname contains invalid chracters or is to long / short', async() => {
        (useSignUp as jest.Mock).mockImplementation(() => ({
            isLoaded: true,
            signUp: {
                create: jest.fn()
            }
        }));
        const { findByTestId, getByTestId } = render(<FormComponent />);

        const fullNameInput = await findByTestId('fullNameInputTestID');
        fireEvent.changeText(fullNameInput, '1234%%%%1234')
    
        const checkBox = await findByTestId('CheckboxTestId')
        fireEvent.press(checkBox)

        const createAccountButton = await findByTestId("createAccountButtonTestID")
        fireEvent.press(createAccountButton)

        await waitFor(() => {
            expect(getByTestId('fullNameInputErrorTestID')).toBeTruthy()
        })
    })

    
    it('should display an error message when Password contains invalid chracters or is to long / short', async() => {
        (useSignUp as jest.Mock).mockImplementation(() => ({
            isLoaded: true,
            signUp: {
                create: jest.fn()
            }
        }));
        const { findByTestId, getByTestId } = render(<FormComponent />);

        const passwordInput = await findByTestId('passwordInputTestID');
        fireEvent.changeText(passwordInput, '1234')
    
        const checkBox = await findByTestId('CheckboxTestId')
        fireEvent.press(checkBox)

        const createAccountButton = await findByTestId("createAccountButtonTestID")
        fireEvent.press(createAccountButton)

        await waitFor(() => {
            expect(getByTestId('passwordInputErrorTestID')).toBeTruthy()
        })
    })

    it('Should Sign Up and Redirect to Profile Page When All Field are Filled and Privacy policy are agreed', async () => {

        const mockNavigation = { navigate: jest.fn() };
		(useNavigation as jest.Mock).mockReturnValue(mockNavigation);

		const mockDispatch = jest.fn();
		(useDispatch as jest.Mock).mockReturnValue(mockDispatch);

		const mockSignUp = {
			isLoaded: true,
			signUp: {
				create: jest.fn(),
				prepareEmailAddressVerification: jest.fn(),
				attemptEmailAddressVerification: jest.fn().mockReturnValue(true),
			},
			setActive: jest.fn(),
		};
		(useSignUp as jest.Mock).mockReturnValue(mockSignUp);

		const { findByTestId } = render(<FormComponent />);

		const emailInput = await findByTestId('emailInputTestID');
		const fullnameInput = await findByTestId('fullnameInputTestID');
		const passwordInput = await findByTestId('passwordInputTestID');

		fireEvent.changeText(emailInput, 'test@example.com');
		fireEvent.changeText(fullnameInput, 'John Doe');
		fireEvent.changeText(passwordInput, 'password123');

		const checkbox = await findByTestId('CheckboxTestId');
		const createAccountBtn = await findByTestId('createAccountButtonTestID');

		fireEvent.press(checkbox);
		fireEvent.press(createAccountBtn);

		await waitFor(() => {
			expect(mockSignUp.signUp.create).toHaveBeenCalledWith({
				emailAddress: 'test@example.com',
				password: 'password123',
			});
		});

		await waitFor(async () => {
			expect(await findByTestId('verivyButtonTestID')).toBeTruthy();
		});

		const verifyBtn = await findByTestId('verivyButtonTestID');
		fireEvent.press(verifyBtn);

		await waitFor(() => {
			expect(mockNavigation.navigate).toHaveBeenCalledWith('Profile');
		});
    })


    it('should dipslay an error message when there is an error in the sign-up process', async () => {
		(useSignUp as jest.Mock).mockImplementation(() => ({
			isLoaded: true,
			signUp: {
				create: jest.fn(() => Promise.reject(new Error('Sign-up failed'))),
			},
		}));

		const { getByText, findByTestId } = render(<FormComponent />);

		const emailInput = await findByTestId('emailInputTestID');
		const fullnameInput = await findByTestId('fullnameInputTestID');
		const passwordInput = await findByTestId('passwordInputTestID');
		const checkbox = await findByTestId('CheckboxTestId');

		fireEvent.changeText(emailInput, 'test@example.com');
		fireEvent.changeText(fullnameInput, 'Test User');
		fireEvent.changeText(passwordInput, 'password123');
		fireEvent.press(checkbox);

		fireEvent.press(getByText('Create account'));

		await waitFor(() => {
			expect(Alert.alert).toHaveBeenCalledWith('Error occurred, try again');
		});
	});

    it('should display an alert message when privacy policy is not agreed', async () => {
		(useSignUp as jest.Mock).mockImplementation(() => ({
			isLoaded: true,
			signUp: {
				create: jest.fn(() => Promise.reject(new Error('Sign-up failed'))),
			},
		}));

		const { getByText, findByTestId } = render(<FormComponent />);

		const emailInput = await findByTestId('emailInputTestID');
		const fullnameInput = await findByTestId('fullnameInputTestID');
		const passwordInput = await findByTestId('passwordInputTestID');

		fireEvent.changeText(emailInput, 'test@example.com');
		fireEvent.changeText(fullnameInput, 'Test User');
		fireEvent.changeText(passwordInput, 'password123');

		fireEvent.press(getByText('Create account'));

		await waitFor(() => {
			expect(Alert.alert).toHaveBeenCalledWith(
				'You must agree to privacy policy'
			);
		});
	});

})