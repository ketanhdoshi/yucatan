import { combineReducers } from 'redux'
import counter from './counter'
import properties from '../features/properties/propertiesSlice'
import users from '../features/users/usersSlice'
import matches from './matches'
import posts from './posts'
import login from '../features/login/loginSlice'

const rootReducer = combineReducers({
    counter,
    properties,
    users,
    matches,
    login,
    posts
})

export default rootReducer
