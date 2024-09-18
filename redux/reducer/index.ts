

import { combineReducers } from '@reduxjs/toolkit'

import authReducer from '../reducer/AuthReducer'


const rootReducer = combineReducers({
    auth: authReducer
})


export default rootReducer