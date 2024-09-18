import { View, Text } from 'react-native'
import React from 'react'



import { 
    ScreenTitleStyle,
    BoldedTitlePart
 } from './ScreenTitle.Style'


 

const ScreenTitle = () => {
  return (
    <ScreenTitleStyle>
        <BoldedTitlePart>Virtual </BoldedTitlePart>
        Gallery
    </ScreenTitleStyle>
  )
}



export default ScreenTitle