// -----------------------------------------------------------------
// Reducer for the Get Properties set of actions. Each set usually has
// 3 action types for REQ, SUCCESS and ERROR
// -----------------------------------------------------------------

const login = (state = [], action) => {
    switch (action.type) {
        case 'LOGIN_LOCAL_REQ':
            return {
                api: "requesting"
            }
        case 'LOGIN_LOCAL_SUCCESS':
            console.log ('reducer list = ', action.jwt);
            return {
                jwt: action.jwt,
                api: "success"
            }
        case 'LOGIN_LOCAL_ERROR':
            return {
                error: action.error,
                api: "error"
            }
        default:
            return state
    }
}

export default login
