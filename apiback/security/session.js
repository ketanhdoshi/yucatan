'use strict';

// -----------------------------------------------
// Module for session handling. Each user login creates a new session
// which we cache. Conceptually, 
// A Jwt has a 1:1 mapping to a Session
//      It could contain tokens of different types eg. Access, Email etc
// A Session object has a N:1 mapping to a User
//      It contains a Session start time and end time
// A User object has a N:1 mapping to a Role
// -----------------------------------------------

const Cache = require('../utils/cache');    // Redis caching

// -----------------------------------------------
// Create a session object to track each individual login session
// Note that this session object is not strictly necessary for our
// authentication validation. But we are using it as an example in case
// it is needed for tracking session data
// -----------------------------------------------
module.exports.create = (userProfile, token) => {
    const { access } = token;
    const { userId } = userProfile;
    
    // TODO populate the start, end times for the session
    const session = {
        start: 0,   // start time of the session
        end: 0,     // end time of the session
        uId: userId
    };
    
    // console.log ('session create ', userProfile, token, access, userId, session);
    
    // Cache the session with the access token as the key
    Cache.setHash (access, session);
    
    // Cache the user profile with the user Id as the key
    Cache.setHash (userId, userProfile);
};

// -----------------------------------------------
// Validate the session, called during Jwt validation. It looks up the values
// that were cached when the session was created. Since the cache calls are
// asynchronous, we pass in callback functions to them. We are called
// synchronously with await so when the cache callbacks return, we 
// return those values
// -----------------------------------------------
module.exports.validate = async (userId, access) => {
    try {
        const session = await Cache.getHash (access);
        console.log ('received session', session, userId);
        // Redis returns null, not error, if a key is not found in the cache. So
        // we have to explicitly check whether we received a null.
        if (!session || session.uId !== userId) { throw "no session"}
        // session exists in cache and session's userId matches.
        // We don't check for session expiry because the JWT plugin checks that
        // for us. For now we are not implementing extending of the session    
        const userProfile = await Cache.getHash (userId);
        if (!userProfile) { throw "no user profile"}        
        // user profile exists in cache
        console.log ('user profile', userProfile);
        // Now return the user profile
        return (userProfile);
    } catch (err) {
        // Validation failed so return null
        console.log ('user validation failed', err);
        return (null);
    }
};

/* This is trial logic which worked, but wasn't using the async await nicely.
This resulted in code that was not as easy to read both here, and in the 
Cache.getHash for redis

module.exports.validate = async (userId, access) => {
    const session = await Cache.getHash (access);
    console.log ('received session', session, userId);
    if (session && session.uId === userId) {
        // session exists in cache and session's userId matches.
        // We don't check for session expiry because the JWT plugin checks that
        // for us. For now we are not implementing extending of the session    
        const userProfile = await Cache.getHash (userId);        
        if (userProfile) {
            // user profile exists in cache
            console.log ('user profile', userProfile);
            // Now return the user profile
            return (userProfile);
        }
        else {
            console.log ('no user profile');
            // Validation failed so return null
            return (null);
        }
    } else {
        console.log ('no session');
        // Validation failed so return null
        return (null);
    }
};
 */

// -----------------------------------------------
// Delete the session from the cache
// -----------------------------------------------
module.exports.delete = (userId, access) => {  
    // Delete the session with the access token as the key
    Cache.delete (access);
    
    // Delete the user profile with the user Id as the key
    Cache.delete (userId);
}

