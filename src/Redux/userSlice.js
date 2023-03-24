import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: {
            allUser: null,
            isFetching: false,
            error: false
        },
        msg: ''
    },
    reducers: {
        // GET USER
        getUserStart: state => {
            state.users.isFetching = true
        },
        getUserSuccess: (state, action) => {
            state.users.allUser = action.payload
            state.users.isFetching = false
        },
        getUserFailed: state => {
            state.users.isFetching = false
            state.users.error = true
        },

        // DELETE
        deleteUserStart: state => {
            state.users.isFetching = true
        },
        deleteUserSuccess: (state, action) => {
            state.users.isFetching = false
            state.msg = action.payload
        },
        deleteUserFailed: (state, action) => {
            state.users.isFetching = false
            state.users.error = true
            state.msg = action.payload
        }
    }
})

export const {
    getUserStart,
    getUserSuccess,
    getUserFailed,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailed
} = userSlice.actions
export default userSlice.reducer