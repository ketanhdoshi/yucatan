import { combineReducers } from 'redux'
import counter from './counter'
import properties from '../features/properties/propertiesSlice'
import matches from './matches'
import posts from './posts'
import login from './login'

const rootReducer = combineReducers({
    counter,
    properties,
    matches,
    login,
    posts
})

export default rootReducer
