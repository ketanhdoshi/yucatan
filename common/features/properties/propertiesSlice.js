import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// -----------------------------------------------------------------
// Reducer for the Get Properties set of actions. Each set usually has
// 3 action types for REQ, SUCCESS and ERROR
// -----------------------------------------------------------------

import { apiListProperties, apiCreateProperty, apiUpdateProperty } from '../../api/api'

const initialState = {
    items: [],
    status: 'idle',
    error: null,
}

export const listProperties = createAsyncThunk('properties/list', apiListProperties)
export const createProperty = createAsyncThunk('properties/create', apiCreateProperty)
export const updateProperty = createAsyncThunk('properties/update', apiUpdateProperty)

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
            state.error = action.payload
      },
      [createProperty.fulfilled]: (state, action) => {
            state.items.push(action.payload)
      },
      [updateProperty.fulfilled]: (state, action) => {
            const { id } = action.payload
            const itemIndex = state.items.findIndex(item => item.id === id )
            if (itemIndex) {
                state.items[itemIndex] = {...action.payload}
            }
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