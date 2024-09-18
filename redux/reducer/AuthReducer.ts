import { createSlice } from "@reduxjs/toolkit";
import { AuthType } from "../types/Auth";


const authSlice = createSlice(
    {
        name: 'auth',
        initialState: {
            authenticated: false,
            authType: AuthType.EMAIL,
            username: '',
            emailAddress: '',
            profileImageUrl: '',
            fullName: '',
            bio: '',
            twitter: '',
            instagram: '',
            website: ''
        },
        reducers: {
            selectAuthenticated: (state, action) => {
                state.authenticated = action.payload
            },
            selectAuthType: (state, action) => {
                state.authType = action.payload
            },
            selectUsername: (state, actions) => {
                state.username = actions.payload
            },
            selectEmailAddress: (state, action) => {
                state.emailAddress = action.payload
            },
            selectProfileImageUrl: (state, actions) => {
                state.profileImageUrl = actions.payload
            },
            selectFullname: (state, action) => {
                state.fullName = action.payload 
            },
            selectBio: (state, action) => {
                state.bio = action.payload
            },
            selectTwitter: (state, action) => {
                state.twitter = action.payload
            },
            selectInstagram: (state, action) => {
                state.instagram = action.payload
            },
            selectWebsite: (state, action) => {
                state.instagram = action.payload
            }
        }
    }
)


export const { 
    selectAuthenticated, 
    selectAuthType, 
    selectUsername, 
    selectEmailAddress, 
    selectFullname, 
    selectProfileImageUrl,
    selectBio,
    selectInstagram,
    selectTwitter,
    selectWebsite
} = authSlice.actions
export default authSlice.reducer