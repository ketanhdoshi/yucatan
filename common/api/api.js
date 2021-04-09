// -----------------------------------------------------------------
// This file contains all the async API calls. These are invoked by the Action Helpers
// It uses a Promise-based client library to make API calls over HTTP. When the
// API call responds, it calls the Success and Error action callbacks for that API call
// -----------------------------------------------------------------

import axios from 'axios';  // Promise-based async HTTP calls

const apiUrl = 'http://localhost:3011/api';

// -----------------------------------------------------------------
// Get User Data (with JWT token) from LocalStorage
// -----------------------------------------------------------------
export const getUserToken = () => {
    if (typeof window !== 'undefined') {
        // We don't have a browser (the APIs that the browser provides) when rendering on the server,  
        // “Window” is the root object provided by the browser for all its APIs.
        return JSON.parse(localStorage.getItem('user'));
    } else {
        return null;
    }
}

// -----------------------------------------------------------------
// Save User Data (with JWT token) in LocalStorage
// -----------------------------------------------------------------
const setUserToken = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
}

// -----------------------------------------------------------------
// Remove User Data (with JWT token) from LocalStorage
// -----------------------------------------------------------------
export const removeUserToken = () => {
    localStorage.removeItem("user");
}

// -----------------------------------------------------------------
// Set the JWT token into the Authorization request header
// -----------------------------------------------------------------
const authHeader = () => {
    const userData = getUserToken();
  
    if (userData && userData.token) {
      return { Authorization: 'Bearer ' + userData.token };
    } else {
      return {};
    }
}

// -----------------------------------------------------------------
// Login Local
// -----------------------------------------------------------------
export const apiLoginLocal = async (creds) => {
    console.log ("calling api");

    // Alternate way to send axios requests instead of axios.post(). This way
    // allows you to sent additional options like Request Headers.
    const res = await axios({
        method: 'post',
        url: apiUrl + '/login/local',
        data: creds,
    });
    let jwt = res.headers['authorization'];
    console.log ("jwt is ", jwt, res);

    let userData = {
        name: res.data.name,
        scope: res.data.scope,
        token: jwt
    }

    // Save the user data in Local Storage
    setUserToken(userData)

    return userData
}

/* export const oldapiLoginLocal = async (creds, successCB, errorCB, dispatch) => {
    console.log ("calling api");
    try {
        // Alternate way to send axios requests instead of axios.post(). This way
        // allows you to sent additional options like Request Headers.
        const res = await axios({
            method: 'post',
            url: apiUrl + '/login/local',
            data: creds,
        });
        let jwt = res.headers['authorization'];
        let userData = {
            name: res.data.name,
            scope: res.data.scope,
            token: jwt
        }

        // Save the user data in Local Storage
        setUserToken(userData)

        console.log ("jwt is ", jwt, res);
        successCB (dispatch, userData)
    } catch (err) {
        console.error(err);
        errorCB (dispatch, err);
    }
} */

// -----------------------------------------------------------------
// Logout
// -----------------------------------------------------------------
export const apiLogout = async () => {
    // Before removing the token, get the authorization header as we will need it for the API call. 
    let auth = authHeader();
    // Remvove the user data from Local Storage
    removeUserToken();
    // Call the Logout API. We don't really care about the success or failure
    const res = await axios.get(apiUrl + '/logout', { headers: auth});
    return res.data.res;
}

/* export const oldapiLogout = async () => {
    try {
        // Before removing the token, get the authorization header as we will need it for the API call. 
        let auth = authHeader();
        // Remvove the user data from Local Storage
        removeUserToken();
        // Call the Logout API. We don't really care about the success or failure
        const res = await axios.get(apiUrl + '/logout', { headers: auth});
    } catch (err) {
        console.error(err);
    }
} */

// -----------------------------------------------------------------
// Get list of Properties
// -----------------------------------------------------------------
export const apiListProperties = async () => {
    const res = await axios.get(apiUrl + '/property', { headers: authHeader()});
    return res.data.res;
}

/* export const apiGetProperties = async (successCB, errorCB, dispatch) => {
    try {
        const res = await axios.get(apiUrl + '/property', { headers: authHeader()});
        let data = res.data.res;
        console.log ("data is ", data);
        successCB (dispatch, data)
    } catch (err) {
        console.error(err);
        errorCB (dispatch, err);
    }
} */

// -----------------------------------------------------------------
// Create Property
// -----------------------------------------------------------------
export const apiCreateProperty = async (newProperty) => {
    console.log("Create Property API", newProperty)
    const res = await axios({
        method: 'post',
        url: apiUrl + '/property',
        data: newProperty,
        headers: authHeader(),
    });
    return res.data.res;
}

// -----------------------------------------------------------------
// Update Property
// -----------------------------------------------------------------
export const apiUpdateProperty = async ({_id, chgProperty}) => {
    console.log("Update Property API", _id, chgProperty)
    const res = await axios({
        method: 'put',
        url: apiUrl + '/property/' + _id,
        data: chgProperty,
        headers: authHeader(),
    });
    return res.data.res;
}

/* export const apiSetProperty = async (chgProperty, successCB, errorCB, dispatch) => {
    
    try {
        const res = await axios({
            method: 'put',
            url: apiUrl + '/property/' + chgProperty.id,
            data: chgProperty,
            headers: authHeader(),
        });

        let data = res.data.res;
        console.log ("data is ", data);
        successCB (dispatch, data)
    } catch (err) {
        console.error(err);
        errorCB (dispatch, err);
    }
} */

// -----------------------------------------------------------------
// Delete Property
// -----------------------------------------------------------------
export const apiDeleteProperty = async (_id) => {
    console.log("Delete Property API", _id)
    const res = await axios({
        method: 'delete',
        url: apiUrl + '/property/' + _id,
        headers: authHeader(),
    });
    return res.data.res;
}

// -----------------------------------------------------------------
// Get list of Users
// -----------------------------------------------------------------
export const apiListUsers = async () => {
    const res = await axios.get(apiUrl + '/user', { headers: authHeader()});
    return res.data.res;
}

// -----------------------------------------------------------------
// Get list of Users from a Mock Rest API
// -----------------------------------------------------------------
export const apiGetMockUsers = (successCB, dispatch) => {
    axios.get('http://jsonplaceholder.typicode.com/users')
        .then(res => {
            return res.data;
        })
        .then(data => {
            console.log ("data is ", data[0])
            successCB (dispatch, data)
        })  
        .catch(err => {
            console.log(err);
        }); 
}

// -----------------------------------------------------------------
// Get list of Posts from a Mock Rest API
// -----------------------------------------------------------------
export const apiGetMockPost = (postNo, successCB, dispatch) => {
    axios.get('http://jsonplaceholder.typicode.com/posts/' + postNo)
        .then(res => {
            return res.data;
        })
        .then(data => {
            console.log ("data is ", data)
            successCB (dispatch, data)
        })  
        .catch(err => {
            console.log(err);
        }); 
}

// -----------------------------------------------------------------
// OBSOLETE Use built-in 'fetch' function instead of 'axios' to 
// Get list of Users
// -----------------------------------------------------------------
export const apiFetchGetUsers = (successCB, dispatch) => {
    fetch('http://jsonplaceholder.typicode.com/users')
      .then(res => {
        return res.json();
      })  
      .then(data => {
        console.log ("data is ", data[0])
        successCB (dispatch, data[0].phone)
      })  
      .catch(err => {
        console.log(err);
      }); 
}
