import { View, Text } from 'react-native'
import React from 'react'

import {
  ImageContainerStyle,
  TopContainer,
  SmallImage,
  BigImage
} from './ImageContainer.Style'


const ImageContainer = () => {
  return (
    <ImageContainerStyle>
        <TopContainer>
          <SmallImage
            testID='smallImage1'
            source={require("../../../assets/images/home-page-digital-art1.png")}
          />
          <SmallImage
            testID='smallImage2'
            source={require("../../../assets/images/home-page-digital-art2.png")}
          />
        </TopContainer>
        <BigImage
          testID='bigImage'
          source={require("../../../assets/images/home-page-digital-art3.png")}
        />
      </ImageContainerStyle>
  )
}




export default ImageContainer