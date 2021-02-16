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
// asynchronous, we pass in callback functions to them. We are also called
// asynchronously with input callback functions so when the cache callbacks 
// return, we call those input callbacks in turn
// -----------------------------------------------
module.exports.validate = async (userId, access, cb) => {
    Cache.getHash (access,
        // The cache calls this first callback
        (err, session) => {
            // console.log ('received session', session, userId);
            
            if (session && session.uId === userId) {
                // session exists in cache and session's userId matches.
                // We don't check for session expiry because the JWT plugin checks that
                // for us. For now we are not implementing extending of the session    
                Cache.getHash (userId,
                
                    // The cache calls this second callback
                    (err, userProfile) => {
                        if (userProfile) {
                            // user profile exists in cache
                            // console.log ('user profile', userProfile);
                            // Now call our input callback with the user profile
                            cb (userProfile);
                        }
                        else {
                            console.log ('no user profile');
                            // Validation failed so call our input callback 
                            // with null
                            cb (null);
                        }
                    }
                );
            }
            else {
                console.log ('no session');
                // Validation failed so call our input callback with null
                cb (null);
            }
        }
    );
};

// -----------------------------------------------
// Delete the session from the cache
// -----------------------------------------------
module.exports.delete = (userId, access) => {  
    // Delete the session with the access token as the key
    Cache.delete (access);
    
    // Delete the user profile with the user Id as the key
    Cache.delete (userId);
}

