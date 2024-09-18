import styled from "styled-components/native";

import Icon from 'react-native-vector-icons/AntDesign'
import { Platform } from "react-native";


export const HeaderComponentWrapper = styled.View.attrs({
    testID: 'HeaderComponentWrapperTestId'
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 84%;
    margin-top: ${Platform.OS === "android" ? '30px' : '0px'};
`


export const PageTitle = styled.Text.attrs({
    testID: 'PageTitleTestId'
})`
    color: #fff;
    text-align: center;
    font-family: Poppin_500Medium;
    font-size: 19px;
`


export const IconWrapper = styled.TouchableOpacity.attrs({
    testID: "IconWrapperTestId"
})`
    padding: 6px;
    border: 2px solid #fff;
    border-radius: 10px;
`

export const ArrowIcon = styled(Icon).attrs({
    testID: "ArrowIconTestId"
})`

`

export const PlaceHolderView = styled.View.attrs({
    testID: "PlaceHolderViewTestId"
})`
    width: 40px;
    height: 1px;
`
