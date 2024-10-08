import { LinearGradient } from "expo-linear-gradient";

import styled from "styled-components/native";

export const IntroTextStyle = styled.Text`
  margin-top: 25px;
  font-size: 20px;
  color: #fff;
`;

export const LogInBtn = styled(LinearGradient)`
  width: 200px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.54;
  shadow-radius: 20px;
  elevation: 20;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 10px;
`;

export const LogInBtnText = styled.Text`
  font-size: 20px;
  background-color: transparent;
  color: #fff;
`;

export const Container = styled.ImageBackground`
  width: "100%";
  height: "100%";
  align-items: center;
  justify-content: center;
`;
