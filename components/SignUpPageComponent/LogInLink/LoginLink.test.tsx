

import { fireEvent, render } from '../../../test-utils'
import LogInLinkCOmponent from './LogInLinkCOmponent.component'

jest.mock('expo-font')
jest.mock('expo-asset')

jest.mock('@expo-google-fonts/poppins', () => ({
	useFonts: jest.fn().mockReturnValue([true, null])
}))

describe('LoginLinkComponent Test', () => {
    it(`Should Render Component with a "Log In" link and a Already Have Accoun text`, async () => {
        const { findByText } = render(<LogInLinkCOmponent navigate={undefined}/>)
    
        const preText = await findByText('Already Have an Account')
        const logInLink = await findByText("Log In")

        expect(preText).toBeTruthy()
        expect(logInLink).toBeTruthy()

    })

    it(`Should use Poppins_300Light and Poppins_400Regular fonts`, async () => {
        const { findByText } = render(<LogInLinkCOmponent navigate={undefined}/>)
    
        const preText = await findByText('Already Have an Account')
        const logInLink = await findByText("Log In")

        expect(preText.props.style.fontFamily).toEqual('Poppins_300Light')
        expect(logInLink.props.style.fontFamily).toEqual('Poppins_400Regular')

    })

    it(`Should Navigate SignIn Screen When The Log In Link is Clicked`, async () => {
      const navigation = {
        navigate: jest.fn()
      }

      const { findByText } = render(<LogInLinkCOmponent navigation={navigation} />)

      const logInLink = await findByText('log In')

      fireEvent.press(logInLink)

      expect(navigation.navigate).toHaveBeenCalledWith('SignIn')

    })

})