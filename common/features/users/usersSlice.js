import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// -----------------------------------------------------------------
// Reducer for the Get Users set of actions. Each set usually has
// 3 action types for REQ, SUCCESS and ERROR
// -----------------------------------------------------------------

import { apiListUsers } from '../../api/api'
import {getLogout } from '../login/loginSlice'

const initialState = {
    items: [],
    status: 'idle',
    error: null,
}

export const listUsers = createAsyncThunk('users/list', apiListUsers)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers: {
        [listUsers.pending]: (state, action) => {
            state.status = 'loading'
        },
        [listUsers.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            // Add any fetched users to the array
            state.items = action.payload
        },
        [listUsers.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [getLogout.fulfilled]: (state, action) => {
            state.items = []
            state.status = 'idle'
            state.error = null
        },
    },
})
  
export default usersSlice.reducer