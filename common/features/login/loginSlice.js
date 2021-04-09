import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// -----------------------------------------------------------------
// Slice for the Login and Logout set of actions
// -----------------------------------------------------------------

import { getUserToken, apiLoginLocal, apiLogout } from '../../api/api'

const userData = getUserToken();
const initialState = {
    userData: userData ? userData : null,
    status: 'idle',
    error: null,
}

export const getLoginLocal = createAsyncThunk('login/login', apiLoginLocal)
export const getLogout = createAsyncThunk('login/logout', apiLogout)

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getLoginLocal.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getLoginLocal.fulfilled]: (state, action) => {
            console.log ('login reducer user = ', action.payload);
            state.status = 'succeeded'
            // Add any fetched properties to the array
            state.userData = action.payload
        },
        [getLoginLocal.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [getLogout.fulfilled]: (state, action) => {
            state.userData = null
            state.status = 'idle'
            state.error = null
        },
    },
})

export const selectLoginUser = (state) => state.login.userData

export default loginSlice.reducer