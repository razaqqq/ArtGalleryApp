

import React from "react";
import { render } from "../../../test-utils";
import ScreenTitle from "./ScreenTitle.Component";


describe('ScreenTitle Test', () => {
    it('It Render Screen Title', () => {
        const {queryByText} = render(<ScreenTitle/>)

        const screenTitleViertualGallery = queryByText("Virtual Gallery")
 

        expect(screenTitleViertualGallery).toBeTruthy()


    })
})