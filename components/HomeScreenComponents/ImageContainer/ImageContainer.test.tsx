import React from 'react'
import { render } from '../../../test-utils'
import ImageContainer from './ImageContainer.Components'

describe('Images Container', () => {
    it('renders three images', () => {
        const { queryByTestId } = render(<ImageContainer />)

        const smallImage1 = queryByTestId('smallImage1')
        const smallImage2 = queryByTestId('smallImage2')
        const bigImage = queryByTestId('bigImage')

        console.log(smallImage1)
        console.log(smallImage2)
        console.log(bigImage)

        expect(smallImage1).toBeTruthy()
        expect(smallImage2).toBeTruthy()
        expect(bigImage).toBeTruthy()


    })
})