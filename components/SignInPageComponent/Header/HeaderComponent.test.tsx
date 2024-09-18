import { fireEvent, render, waitFor } from "../../../test-utils"
import HeaderComponent from "./HeaderCOmponent.component"

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

describe('HeaderComponent Test', () => {

	afterEach(() => {
		jest.resetAllMocks()
	})

    it('should navigate to previous screen when back button is clicked', async () => {
		const navigation = {
			canGoBack: jest.fn().mockReturnValue(true),
			goBack: jest.fn(),
		};

		const { findByTestId } = render(<HeaderComponent navigation={navigation} />);

		const iconWrapper = await findByTestId('IconWrapperTestID');

		fireEvent.press(iconWrapper);

		await waitFor(() => {
			expect(navigation.goBack).toHaveBeenCalled();
		});
	});

    it('should render header component with title and back button', async () => {
		const navigation = {
			canGoBack: jest.fn().mockReturnValue(true),
			goBack: jest.fn(),
		};

		const { userFonts } = require('@expo-google-fonts/poppins');
		userFonts.mockReturnValue([true, null])

		const { findByTestId } = render(<HeaderComponent navigation={navigation} />);

		expect(await findByTestId('HeaderComponentWrapperTestId')).toBeTruthy();
		expect(await findByTestId('IconWrapperTestID')).toBeTruthy();
		expect(await findByTestId('PageTitleComponentTestId')).toBeTruthy();
		expect(await findByTestId('PlaceHolderViewTestId')).toBeTruthy();
	});

    it('should return empty fragment when font fails to load', async () => {
		const navigation = {
			canGoBack: jest.fn().mockReturnValue(true),
			goBack: jest.fn(),
		};

		const { userFonts } = require('@expo-google-fonts/poppins');
		userFonts.mockReturnValue([true, new Error('')])

		const { queryByTestId } = render(<HeaderComponent navigation={navigation} />);

		expect(queryByTestId('HeaderComponentWrapperTestId')).toBeNull();
	});

    it('should return empty fragment when font fails to load', async () => {
		const navigation = {
			canGoBack: jest.fn().mockReturnValue(true),
			goBack: jest.fn(),
		};

		const { userFonts } = require('@expo-google-fonts/poppins');
		userFonts.mockReturnValue([false, null])

		const { queryByTestId } = render(<HeaderComponent navigation={navigation} />);

		expect(queryByTestId('HeaderComponentWrapperTestId')).toBeNull();
	});

    it('should not render back button when navigation cannot go back', async () => {
		const navigation = {
			canGoBack: jest.fn().mockReturnValue(true),
			goBack: jest.fn(),
		};

		jest.doMock('@expo-google-fonts/poppins', () => ({
			Poppins_500Medium: 'Poppins_500Medium',
			useFonts: jest.fn().mockReturnValue([true, null]),
		}));

		const { queryByTestId } = render(<HeaderComponent navigation={navigation} />);
		expect(queryByTestId('IconWrapperTestID')).toBeNull();
	});


    it('should not render back button when navigation is undefined', async () => {
		jest.doMock('@expo-google-fonts/poppins', () => ({
			Poppins_500Medium: 'Poppins_500Medium',
			useFonts: jest.fn().mockReturnValue([true, null]),
		}));

		const { queryByTestId } = render(<HeaderCompanion navigation={undefined} />);
		expect(queryByTestId('IconWrapperTestID')).toBeNull();
	});

})