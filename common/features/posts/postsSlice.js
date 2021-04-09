import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// -----------------------------------------------------------------
// Reducer for the Get posts set of actions. Each set usually has
// 3 action types for REQ, SUCCESS and ERROR
// -----------------------------------------------------------------

import { apiListMockPosts } from '../../api/api'
import {getLogout } from '../login/loginSlice'

const initialState = {
    items: [],
    status: 'idle',
    error: null,
}

export const listPosts = createAsyncThunk('posts/list', apiListMockPosts)

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

    },
    extraReducers: {
        [listPosts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [listPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array
            state.items = action.payload
        },
        [listPosts.rejected]: (state, action) => {
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

export const selectAllPosts = (state) => state.posts.items
export const selectPostsStatus = (state) => state.posts.status
export const selectPostsError = (state) => state.posts.error

export default postsSlice.reducer