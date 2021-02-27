// -----------------------------------------------------------------
// Reducer for the Get Properties set of actions. Each set usually has
// 3 action types for REQ, SUCCESS and ERROR
// -----------------------------------------------------------------

import { getUserToken } from '../api/api.js';

const userData = getUserToken();
const initialState = userData ? { userData } : { userData: null };

const login = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_LOCAL_REQ':
            return {
                api: "requesting"
            }
        case 'LOGIN_LOCAL_SUCCESS':
            console.log ('login reducer user = ', action.userData);
            return {
                userData: action.userData,
                api: "success"
            }
        case 'LOGIN_LOCAL_ERROR':
            return {
                error: action.error,
                api: "error"
            }
        case 'LOGOUT':
            return { userData: null }
        default:
            return state
    }
}

export default login
