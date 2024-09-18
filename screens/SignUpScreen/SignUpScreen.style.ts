import styled from "styled-components/native";
import {Platform} from 'react-native'

export const Container = styled.SafeAreaView`
    width: 100%;
    height: 100%;
    align-items: center;
    background-color: #1b1b1b;
    padding-top: ${Platform.OS === "android" ? 50 : 0};
`