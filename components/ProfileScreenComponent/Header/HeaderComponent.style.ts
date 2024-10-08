import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Platform } from 'react-native';

export const HeaderComponentWrapper = styled.View.attrs({
	testID: 'HeaderComponent',
})`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 84%;
	margin-top: ${Platform.OS === 'android' ? '40px'  : '0px'};
`;

export const IconWrapper = styled.TouchableOpacity.attrs({
	testID: 'IconWrapper',
})`
	padding: 6px;
	border: 2px solid #fff;
	border-radius: 10px;
`;

export const ArrowIcon = styled(Icon).attrs({
	testID: 'ArrowIcon',
})``;

export const MenuIconWrapper = styled.TouchableOpacity``;

export const MenuIcon = styled.Image.attrs({
	testID: 'MenuIcon'
})``;