import { createSlice } from "@reduxjs/toolkit"
import { setToken, removeToken, getToken } from "../../util/tokenService"
const initialState = {
    user: null,
    token: getToken(),
    status: null,
    error: null,
    message: null,
    isLoading:false
}

const Slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        signUpUser: (state) => {
            state.status = 'loading',
            state.isLoading = true,
            state.error = null,
            state.message = null
        },
        signInUser: (state) => {
            state.status = 'loading',
            state.isLoading = true,
            state.error = null,
            state.message = null
        },
        signUpUserSuccess: (state, action) => {
            state.status = 'success',
            state.isLoading = true,
            state.user = action.payload.user,
            state.token = action.payload.token,
            state.message = action.payload.message,
            state.error = null
        },
        signUpUserFailed: (state, action) => {
            state.status = 'failed',
            state.isLoading = false,
            state.user = null,
            state.token = null,
            state.message = action.payload.message,
            state.error = action.payload.error
        },
        signInUserSuccess: (state, action) => {
            state.status = 'success',
            state.isLoading = false;
            const token = action.payload.token;
            setToken(token);
            state.user = action.payload.user,
            state.token = token;
            state.message = action.payload.message
            state.error = null
        },
        signInUserFailed: (state, action) => {
            state.status = 'failed',
            state.isLoading = false,
            state.user = null,
            state.token = null,
            state.message = action.payload.message,
            state.error = action.payload.error
        },
        emailVerify:(state)=>{
            state.status = 'loading',
            state.isLoading = true,
            state.error = null,
            state.message = null
        },
        emailVerifySuccess:(state,action)=>{
            state.status = 'success',
            state.isLoading = false,
            state.user = action.payload.user,
            state.token = action.payload.token
            state.message = action.payload.message
            state.error = null
        },
        emailVerifyFailed:(state, action)=>{
            state.status = 'failed',
            state.isLoading = false,
            state.user = null,
            state.token = null,
            state.message = action.payload.message,
            state.error = action.payload.error
        },
        forGotPassword:(state)=>{
            state.status = 'loading',
            state.isLoading = true,
            state.error = null,
            state.message = null
        },
        forGotPasswordSuccess:(state,action)=>{
            state.status = 'success',
            state.isLoading = false,
            state.user = action.payload.user,
            state.message = action.payload.message
            state.error = null
        },
        forGotPasswordFailed:(state,action)=>{
            state.status = 'failed',
            state.isLoading = false,
            state.user = null,
            state.message = action.payload.message,
            state.error = action.payload.error
        },
        emailveirfyForgotpassword:(state)=>{
            state.status = 'loading',
            state.isLoading = true,
            state.error = null,
            state.message = null
        },
        emailveirfyForgotpasswordSuccess:(state,action)=>{
            state.status = 'success',
            state.isLoading = false,
            state.user = action.payload.user,
            state.message = action.payload.message
            state.error = null
        },
        emailveirfyForgotpasswordFailed:(state,action)=>{
            state.status = 'failed',
            state.isLoading = false,
            state.user = null,
            state.message = action.payload.message,
            state.error = action.payload.error
        },
        newPasswordSet:(state)=>{
            state.status = 'loading',
            state.isLoading = true,
            state.error = null,
            state.message = null
        },
        newPasswordSetSuccess:(state,action)=>{
            state.status = 'success',
            state.isLoading = false,
            state.user = action.payload.user,
            state.message = action.payload.message
            state.error = null
        },
        newPasswordSetFailed:(state,action)=>{
            state.status = 'failed',
            state.isLoading = false,
            state.user = null,
            state.message = action.payload.message,
            state.error = action.payload.error
        },
        resetState: (state) => {
            state.status = null;
            state.message = null;
            state.error = null;
          },

          logout: (state) => {
            removeToken();
            state.status = 'success'
            state.token = null;
            state.user = null;
          }

    }
})

export const {
    signInUser,
    signInUserFailed,
    signInUserSuccess,
    signUpUserSuccess,
    signUpUser,
    signUpUserFailed,
    emailVerifyFailed,
    emailVerify,
    emailVerifySuccess,
    forGotPassword,
    forGotPasswordFailed,
    forGotPasswordSuccess,
    emailveirfyForgotpassword,
    emailveirfyForgotpasswordSuccess,
    emailveirfyForgotpasswordFailed,
    newPasswordSet,
    newPasswordSetSuccess,
    newPasswordSetFailed,
    resetState,
    logout
} = Slice.actions;

export default Slice.reducer;