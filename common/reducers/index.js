import { combineReducers } from 'redux'
import counter from './counter'
import properties from './properties'
import matches from './matches'
import posts from './posts'

const rootReducer = combineReducers({
    counter,
    properties,
    matches,
    posts
})

export default rootReducer
