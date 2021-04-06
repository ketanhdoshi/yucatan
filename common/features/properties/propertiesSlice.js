import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// -----------------------------------------------------------------
// Reducer for the Get Properties set of actions. Each set usually has
// 3 action types for REQ, SUCCESS and ERROR
// -----------------------------------------------------------------

import { apiListProperties, apiCreateProperty, apiUpdateProperty, apiDeleteProperty } from '../../api/api'
import {getLogout } from '../login/loginSlice'

const initialState = {
    items: [],
    status: 'idle',
    error: null,
}

export const listProperties = createAsyncThunk('properties/list', apiListProperties)
export const createProperty = createAsyncThunk('properties/create', apiCreateProperty)
export const updateProperty = createAsyncThunk('properties/update', apiUpdateProperty)
export const deleteProperty = createAsyncThunk('properties/delete', apiDeleteProperty)

const propertiesSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {

    },
    extraReducers: {
        [listProperties.pending]: (state, action) => {
            state.status = 'loading'
        },
        [listProperties.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            // Add any fetched properties to the array
            state.items = state.items.concat(action.payload)
        },
        [listProperties.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [createProperty.pending]: (state, action) => {
            state.status = 'loading'
        },
        [createProperty.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.items.push(action.payload)
        },
        [createProperty.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [updateProperty.pending]: (state, action) => {
            state.status = 'loading'
        },
        [updateProperty.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            const { _id } = action.payload
            const itemIndex = state.items.findIndex(item => item._id === _id )
            if (itemIndex >= 0) {
                state.items[itemIndex] = {...action.payload}
            }
        },
        [updateProperty.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [deleteProperty.pending]: (state, action) => {
            state.status = 'loading'
        },
        [deleteProperty.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            const { _id } = action.payload
            const itemIndex = state.items.findIndex(item => item._id === _id )
            if (itemIndex >= 0) {
                delete state.items[itemIndex]
            }
        },
        [deleteProperty.rejected]: (state, action) => {
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
  
//export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
  
export default propertiesSlice.reducer

/* const properties = (state = [], action) => {
    switch (action.type) {
        case 'GET_PROPERTIES_REQ':
            return {
                api: "requesting"
            }
        case 'GET_PROPERTIES_SUCCESS':
            console.log ('reducer list = ', action.propertyList);
            return {
                list: action.propertyList,
                api: "success"
            }
        case 'GET_PROPERTIES_ERROR':
            return {
                error: action.error,
                api: "error"
            }
        default:
            return state
    }
}

export default properties
 */