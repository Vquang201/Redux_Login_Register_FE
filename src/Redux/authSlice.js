import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        register: {
            isFetching: false,
            error: false,
            success: false
        },
        logout: {
            isFetching: false,
            error: false
        }
    },

    reducers: {
        // LOGIN
        loginStart: (state, action) => {
            state.login.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false
            state.login.currentUser = action.payload
            state.login.error = false
        },
        loginFailed: (state, action) => {
            state.login.isFetching = false
            state.login.error = true
        },

        //REGISTER
        registerStart: (state) => {
            state.register.isFetching = true
        },
        registerSuccess: (state) => {
            state.register.isFetching = false
            state.register.error = false
            state.regsster.success = true
        },
        registerFailed: (state) => {
            state.register.isFetching = false
            state.register.error = true
            state.regsster.success = false
        },

        //LOGOUT
        logoutStart: state => {
            state.login.isFetching = true
        },
        logoutSuccess: state => {
            state.login.isFetching = false
            state.login.error = false
            state.login.currentUser = null
        },
        logoutFailed: state => {
            state.login.isFetching = false
            state.login.error = true
        }

    }
})


export const {
    loginStart,
    loginFailed,
    loginSuccess,
    registerStart,
    registerSuccess,
    registerFailed,
    logoutStart,
    logoutFailed,
    logoutSuccess
} = authSlice.actions

export default authSlice.reducer