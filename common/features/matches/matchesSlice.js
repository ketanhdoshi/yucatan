import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// -----------------------------------------------------------------
// Reducer for the Get Matches set of actions. Each set usually has
// 3 action types for REQ, SUCCESS and ERROR
// -----------------------------------------------------------------

import { apiListMockUsers } from '../../api/api'
import {getLogout } from '../login/loginSlice'

const initialState = {
    items: [],
    status: 'idle',
    error: null,
}

export const listMatches = createAsyncThunk('matches/list', apiListMockUsers)

const matchesSlice = createSlice({
    name: 'matches',
    initialState,
    reducers: {

    },
    extraReducers: {
        [listMatches.pending]: (state, action) => {
            state.status = 'loading'
        },
        [listMatches.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            // Add any fetched matches to the array
            state.items = action.payload
        },
        [listMatches.rejected]: (state, action) => {
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

export const selectAllMatches = (state) => state.matches.items
export const selectMatchesStatus = (state) => state.matches.status
export const selectMatchesError = (state) => state.matches.error
  
export default matchesSlice.reducer