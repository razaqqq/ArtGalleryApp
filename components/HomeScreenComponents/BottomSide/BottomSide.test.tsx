

import React from 'react'
import { render } from '@testing-library/react-native'
import BottomSide from './BottomSide.Components'


describe('BottomSide Test',() => {
    it('renders correct BottomSide Component', () => {
        const { queryByText } = render (<BottomSide />)
        

        const introText = queryByText('Become an Artist or Collector')
        const loginBtn = queryByText('Log In')
        const createAccount = queryByText('Create Account')

        expect(introText).toBeTruthy()
        expect(loginBtn).toBeTruthy()
        expect(createAccount).toBeTruthy()

    })
})