

import { Poppins_500Medium, useFonts } from "@expo-google-fonts/poppins";
import { fireEvent, render, waitFor } from "../../../test-utils";
import HeaderComponent from "./HeaderComponent.component";

jest.mock('expo-font')
jest.mock('expo-asset')

jest.mock('@expo-google-fonts/poppins', () => {
    const originalModule = jest.requireActual(`@expo-google-fonts/poppins`);
    return {
        __esModule: true,
        ...originalModule,
        useFonts: jest.fn().mockReturnValue([
            true, null
        ])
    }
})

describe('HeaderComponentTesting', () => {

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('Should Navigate Previous Screen When Back Button is Clicked', async () => {
        const navigation = {
            canGoBack: jest.fn().mockReturnValue(true),
            goBack: jest.fn()
        }

        const {userFonts} = require('@expo-google-fonts/poppins');
        
        userFonts.mockReturnValue([true, null])

        const { findByTestId } = render(<HeaderComponent navigation={navigation} />)

        const iconWrapper = await findByTestId("IconWrapperTestId")

        fireEvent.press(iconWrapper)

        await waitFor(() => {
            expect(navigation.goBack).toHaveBeenCalled()
        })


    })

    it('Shold Render Header Component with Title Back Button', async () => {
        const navigation = {
            canGoBack: jest.fn().mockReturnValue(true),
            goBack: jest.fn()
        }

        jest.doMock(`@expo-google-fonts/poppins`, () => ({
            Poppins_500Medium: 'Poppins_500Medium',
            useFonts: jest.fn().mockReturnValue([true, null])
        }))

        const { findByTestId } = render(<HeaderComponent navigation={navigation} />)

        expect(await findByTestId('HeaderComponentWrapperTestId')).toBeTruthy()
        expect(await findByTestId('IconWrapperTestId')).toBeTruthy()
        expect(await findByTestId('PageTitleTestId')).toBeTruthy()
        expect(await findByTestId('PlaceHolderViewTestId')).toBeTruthy()

    })

    it(`Should Return Emty Fragments When Font Fails to Load due an Error`, async () => {
        const navigation = {
            canGoBack: jest.fn().mockReturnValue(true),
            goBack: jest.fn()
        }

        const { useFonts } = require('@expo-google-fonts/poppins');
        useFonts.mockReturnValue([false, new Error('Font Loading Error')])

        const { queryByTestId } = render(<HeaderComponent navigation={navigation}/>)

        expect(queryByTestId('HeaderComponentWrapperTestId')).toBeNull()

    })  

    it(`Should Return Emty Fragments When Font Fails to Load without error`, async () => {
        const navigation = {
            canGoBack: jest.fn().mockReturnValue(true),
            goBack: jest.fn()
        }

        const { useFonts } = require('@expo-google-fonts/poppins');
        useFonts.mockReturnValue([true, null])


        const { queryByTestId } = render(<HeaderComponent navigation={navigation}/>)

        expect(queryByTestId('HeaderComponentWrapperTestId')).toBeNull()

    })  

    it(`Should Not Render Back Button when Navigation cannot go Back`, async () => {
        const navigation = {
            canGoBack: jest.fn().mockReturnValue(false),
            goBack: jest.fn()
        }

        jest.doMock(`@expo-google-fonts/poppins`, () => ({
            Poppins_500Medium: 'Poppins_500Medium',
            useFonts: jest.fn().mockReturnValue([true, null])
        }))

        const { queryByTestId } = render(<HeaderComponent navigation={navigation}/>)

        expect(queryByTestId('IconWrapperTestId')).toBeNull()

    })  

    it(`Should Not render Back Button When Navigation Undefined`, async () => {


        jest.doMock(`@expo-google-fonts/poppins`, () => ({
            Poppins_500Medium: 'Poppins_500Medium',
            useFonts: jest.fn().mockReturnValue([true, null])
        }))

        const { queryByTestId } = render(<HeaderComponent navigation={undefined}/>)

        expect(queryByTestId('IconWrapperTestId')).toBeNull()

    })  

})