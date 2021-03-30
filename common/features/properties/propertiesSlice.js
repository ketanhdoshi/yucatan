// -----------------------------------------------------------------
// Reducer for the Get Properties set of actions. Each set usually has
// 3 action types for REQ, SUCCESS and ERROR
// -----------------------------------------------------------------

const properties = (state = [], action) => {
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
