import styled from "styled-components/native";

export const ImageContainerStyle = styled.View`
  margin-top: 20px;
  flex-direction: column;
  width: 100%;
`;

export const TopContainer = styled.View`
  padding: 10px;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const SmallImage = styled.Image`
  width: 48%;
  border-radius: 7px;
`;

export const BigImage = styled.Image`
  width: 96%;
  border-radius: 8px;
  align-self: center;
  margin-top: 15px;
`;
