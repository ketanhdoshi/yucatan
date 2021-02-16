// -----------------------------------------------------------------
// This file contains all the async API calls. These are invoked by the Action Helpers
// It uses a Promise-based client library to make API calls over HTTP. When the
// API call responds, it calls the Success and Error action callbacks for that API call
// -----------------------------------------------------------------

import axios from 'axios';  // Promise-based async HTTP calls

const apiUrl = 'http://localhost:3011/api';
// -----------------------------------------------------------------
// Get list of Properties
// -----------------------------------------------------------------
export const apiGetProperties = async (successCB, errorCB, dispatch) => {
    // axios.get(apiUrl + '/property') !!!!!!!!!!!!
    try {
        const res = await axios.get(apiUrl + '/user');
        let data = res.data.res;
        console.log ("data is ", data);
        successCB (dispatch, data)
    } catch (err) {
        console.error(err);
        errorCB (dispatch, err);
    }
}

// -----------------------------------------------------------------
// Get list of Users
// -----------------------------------------------------------------
export const apiGetUsers = (successCB, dispatch) => {
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
// Get list of Posts
// -----------------------------------------------------------------
export const apiGetPost = (postNo, successCB, dispatch) => {
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
