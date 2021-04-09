import { combineReducers } from 'redux'
import properties from '../features/properties/propertiesSlice'
import users from '../features/users/usersSlice'
import matches from '../features/matches/matchesSlice'
import posts from '../features/posts/postsSlice'
import login from '../features/login/loginSlice'

const rootReducer = combineReducers({
    properties,
    users,
    matches,
    login,
    posts
})

export default rootReducer
