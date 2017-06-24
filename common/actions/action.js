// -----------------------------------------------------------------
// Action helpers that are called by the UI containers
// These can make API calls to fetch data if needed, and then call
// the dispatcher with an Action object. The Action object has a 'Type' key which
// is the type of Action and zero or more other keys for each parameter for the action.
// The dispatcher in turn invokes the reducer for that action passing it the action
// object
// 
// Action helpers which make async API calls follow this pattern. There are sets of
// 3 action helpers per API call:
//      1) ReqAction - which is called by the UI and which makes the actual API call
//      2) SuccessAction - callback invoked when the API call responds with Success
//      3) ErrorAction - callbck invoked when the API call responds with Error
// 
// These action helpers take a dispatcher as the first parameter followed by all the
// parameters required for the action 
// 
// The 'Type' in the Action object also mirrors this same pattern. Hence there are
// usually 3 Action objects per API call with Types of <action>_REQ, <action>_SUCCESS
// and <action>_ERROR
// -----------------------------------------------------------------

// Import the Action objects
import { 
    getPropertiesReq, getPropertiesSuccess, getPropertiesError,
    getMatchesReq, getMatchesSuccess,
    getPostReq, getPostSuccess,
} from './types'

// Import the API calls
import { 
    apiGetProperties,
    apiGetUsers, 
    apiGetPost,
} from '../api/api'

// -----------------------------------------------------------------
// ReqAction to get the list of Properties
// -----------------------------------------------------------------
export const getPropertiesReqAction = (dispatch) => {
    console.log ("get properties request")
    
    // Call the API to get list of Matches
    apiGetProperties (getPropertiesSuccessAction, getPropertiesErrorAction, dispatch)
    
    // Call the Dispatcher with an action object of type GET_PROPERTIES_REQ
    dispatch (getPropertiesReq ())
}

// -----------------------------------------------------------------
// SuccessAction to get the list of Properties
// -----------------------------------------------------------------
export const getPropertiesSuccessAction = (dispatch, propertyList) => {
    console.log ("get properties success", propertyList[0])
    
    // Call the Dispatcher with an action object of type GET_MATCHES_SUCCESS
    var action = getPropertiesSuccess (propertyList);
    console.log ('action is ', action);
    dispatch (action)
}

// -----------------------------------------------------------------
// ErrorAction to get the list of Properties
// -----------------------------------------------------------------
export const getPropertiesErrorAction = (dispatch, error) => {
    console.log ("get properties error", error)
    
    // Call the Dispatcher with an action object of type GET_MATCHES_SUCCESS
    dispatch (getPropertiesError (error))
}

// -----------------------------------------------------------------
// ReqAction to get the list of Matches
// -----------------------------------------------------------------
export const getMatchesReqAction = (dispatch, pageNo) => {
    console.log ("get matches request")
    
    // Call the API to get list of Matches
    apiGetUsers (getMatchesSuccessAction, dispatch)
    
    // Call the Dispatcher with an action object of type GET_MATCHES_REQ
    dispatch (getMatchesReq (pageNo))
}

// -----------------------------------------------------------------
// SuccessAction to get the list of Matches
// -----------------------------------------------------------------
export const getMatchesSuccessAction = (dispatch, userList) => {
    console.log ("get matches success", userList)
    
    // Call the Dispatcher with an action object of type GET_MATCHES_SUCCESS
    dispatch (getMatchesSuccess (userList))
}

// -----------------------------------------------------------------
// ReqAction to get the list of Posts
// -----------------------------------------------------------------
export const getPostReqAction = (dispatch, postNo) => {
    console.log ("get post request")
    apiGetPost (postNo, getPostSuccessAction, dispatch)
    dispatch (getPostReq (postNo))
}

// -----------------------------------------------------------------
// SuccessAction to get the list of Posts
// -----------------------------------------------------------------
export const getPostSuccessAction = (dispatch, post) => {
    console.log ("get post success", post)
    dispatch (getPostSuccess (post))
}