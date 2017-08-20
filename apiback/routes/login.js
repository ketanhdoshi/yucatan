'use strict';

const Boom = require('boom');   // for HTTP error codes
const Joi = require('joi');     // for parameter validation
const Crypto = require('../utils/crypto'); // for password encryption

const Jwt = require('jsonwebtoken');
function getToken(id) {

    const secretKey = 'NeverShareYourSecret';

    return Jwt.sign({ id  }, secretKey, { expiresIn: '18h' });
}

// HAPI plugin that exposes all the REST APIs for login/logout
// One route is defined for each API URL

exports.register = function (server, options, next) {

    // Import `user` mongoose db model from `models/user.js` file
    const UserModel = require('../models/user');

    // REST: User Login
    server.route({
        method: 'POST',
        path: '/api/login',
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'User login',
            notes: 'User login',
            validate: {
                // Use Joi plugin to validate request
                payload: {
                    username: Joi.string().min(3).max(20).required(),
                    password: Joi.string().min(6).max(12).required()
                }
            }
        },
        handler: function (request, reply) {

            // Get username and password from the incoming request
            const username = request.payload.username;
            const password = request.payload.password;

            //Find user in db for particular username
            UserModel.findOne({
                username
            }, (error, data) => {

                if (error) {
                    reply(Boom.serverUnavailable('Internal Mongo error'), error);
                }
                else if (data === null) {
                    // No matching user
                    reply(Boom.unauthorized('Username or Password invalid'));
                }
                else {
                    // Check if user input password matches hashed password saved in db
                    const dbpassword = data.password;
                    if (!Crypto.check(password, dbpassword)) {
                        reply(Boom.unauthorized('Username or Password invalid'));
                    }
                    else {
                        // Use Cookie authentication strategy (not related to JWT)
                        // Set the cookie
                        const val = { hello: 'me' };
                        request.cookieAuth.set({ sid: val });

                        // Create a JWT token and send it in the response
                        const token = getToken(data._id);
                        reply({
                            statusCode: 200,
                            message: 'Succesful login',
                            data: { token }
                        });
                    }
                }
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/api/logout',
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'User logout',
            notes: 'User logout',
            validate: {
            }
        },
        handler: function (request, reply) {
            // clear the session data
            request.cookieAuth.clear();

            reply('Logged out. See you around :)');
        }
    });

    // Oauth Github Login
    server.route({
        method: 'GET',
        path: '/api/login/github',
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Github login',
            notes: 'Github login',
            auth: 'github',
            handler: function (request, reply) {

                if (!request.auth.isAuthenticated) {
                    return reply(Boom.unauthorized('Authentication failed: ' + request.auth.error.message));
                }

                // Get the github profile details
                const creds = request.auth.credentials;
                const profile = creds.profile;
                const myDetails = {
                    token: creds.token,
                    expiry: creds.expiresIn,
                    refresh: creds.refreshToken,
                    githubId: profile.id,
                    username: profile.username,
                };
                
                // TODO: Now these details can be saved in a cookie or
                // passed back from the API. We could also redirect to
                // another URL where further post login processing can be done
                // Save the profile details in the session as a cookie.
                //request.cookieAuth.set(myDetails);                
                return reply('Hello ' + myDetails.username);                
            }
        },
    });

    // Oauth Github Logout
    server.route({
        method: 'GET',
        path: '/api/logout/github',
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Github logout',
            notes: 'Github logout',
            handler: function (request, reply) {
                
                // TODO: Remove any state that was saved during login. Also
                // can redirect to the login page again
                // Clear any session details saved in the cookie
                //request.cookieAuth.clear();
                return reply('Logged out');
                // reply.redirect('/api/login/github');                
            }
        },
    });
    
    // -----------------------------------------------
    // Files
    // session.js - Session Management
    // token.js - Token Management
    // login.js - this file
    // auth.js - auth plugins
    // cache.js - Redis cache
    // crypto.js - encryption/decryption routines for passwords, client secret etc
    // config.js - read/write environment config values
    // mongodb.js - all mongoose api calls, with a model as a parameter
    // dao.js - do we need this? is there a userdao.js, propertydao.js?
    // acl.js - access control
    // role.js - user roles
    // user.js - user object and user api routes
    // -----------------------------------------------
    
    // -----------------------------------------------
    // Basic Auth Login
    // <Web> = http://localhost:3010
    // <Api> = http://localhost:3011
    // In the Web UI, <Web>:/signin will open a Sign In window where you have a
    // username and password text fields and an OK button. You also have buttons
    // for FB Sign In, Google Sign In, Twitter Sign In etc.
    // If you click on OK, it calls the POST <Api>/api/login/basic in the backend
    // If you clock on FB Sign In, it calls GET <Api>/api/login/fb in the backend
    // and so on
    // 1) Login Basic Auth - takes username, password
    // 2) Login Oauth FB
    // 3) Login Oauth Google and so on
    // 4) Login Autologin - takes autologin token (aka refresh token) and device id (?)
    // All the /api/login/* methods take credentials as input and return a user
    // profile object and an access token as output
    // The Web UI stores both these items in a cookie using the hapi-cookie-auth
    // plugin, and passes the access token to every backend Api call
    // -----------------------------------------------

    // -----------------------------------------------
    // Session and Token Management
    // A User object has a N:1 mapping to a Role
    // A Session object has a N:1 mapping to a User
    //      It contains a Session start time and expiry time (or duration)
    // A Token object has a 1:1 mapping to a Session
    //      It contains a token value and a type eg. Access, Refresh/Autologin, Email/JWT
    // 
    // There are two flows:
    // 1) Login flow - incoming credentials -> user object 
    // + token in case of oauth, and in non-oauth cases, generaate a token.
    // Then create a session, and map token -> session -> user, and cache them
    // 
    // 2) Validate Auth flow - for every API call
    // incoming token. Lookup cache and map a token -> session -> user -> role
    // if no session found, then not authenticated
    // if session found but expired, then not authenticated with session expire return value
    //      The client when it gets this error, will then call Login with an autologin token
    //      if it has one, and get back a new access token. If it doesn't have an autologin
    //      token it will popup a login screen
    // if session found and not expired, then extend token and we are authenticated
    // 
    // -----------------------------------------------
    server.route({
        method: 'POST',
        path: '/api/login/basic',
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Basic Auth login',
            notes: 'Basic Auth login',
            validate: {
                // Use Joi plugin to validate request
                payload: {
                    username: Joi.string().min(3).max(20).required(),
                    password: Joi.string().min(6).max(12).required()
                }
            },
            // Use HTTP Basic Auth for this route
            auth: 'basic',
        },
        handler: function (request, reply) {
            if (false) {
                
            }
            else {
                // Use Cookie authentication strategy (not related to JWT)
                // Set the cookie
                const val = { hello: 'me' };
                request.cookieAuth.set({ sid: val });

                // Create a JWT token and send it in the response
                const token = getToken(data._id);
                reply({
                    statusCode: 200,
                    message: 'Succesful login',
                    data: { token }
                });
            }
        }
    });

    return next();
};

// -----------------------------------------------
// All the /api/login/* routes will first lookup the credentials. If successful
// they will populate a user profile object and optionally an access token. If failure
// they will populate an error message. This part is done in a way that is specific
// for each login type
// After that they all call the this same loginDone function for common processing
// -----------------------------------------------
function loginDone (userProfile, token, errorMessage) {
    if (errorMessage) {
        // return Error Response
    }
    
    if (token == "Empty") {
        token = CreateToken ();
    }
    
    var session = CreateSession (token, userProfile);
    SaveSession(token, session); // internally this calls redis cache
    
    // return token and user Profile to caller
}

function CreateToken () {
}

function SaveSession () {
}

function CreateSession () {
}

function GetSession () {
}

function GetUser () {
}

function GetRole () {
}

// -----------------------------------------------
// Called at every API call
// Should we use hapi-auth-bearer-token plugin for this?
// -----------------------------------------------
function validateSession (token) {
    session = GetSession (token); // internally this calls redis cache
    if (!session) {
        // return Not Authenticated error
    }
    
    if (session.expiryTime > now) {
        // return Session Expired error
    }
    
    ExtendSession (session);
    
    user = GetUser (session);
    role = GetRole (user);
    // Now use this for access control
}

// -----------------------------------------------
// Use this as the validate function for Basic Auth in the
// auth.js plugin
// -----------------------------------------------
function basicAuthValidate (request, username, password, callback) {
    // KD: Looks like username, password is passed in and
    // we don't need to get it explicitly from the request
    // Get username and password from the incoming request
    const XXusername = request.payload.username;
    const XXpassword = request.payload.password;

    // Find user in db for particular username
    UserModel.findOne({
        username
    }, (error, data) => {

        if (error) {
            reply(Boom.serverUnavailable('Internal Mongo error'), error);
        }
        else if (data === null) {
            // No matching user
            reply(Boom.unauthorized('Username or Password invalid'));
        }
        else {
            // Check if user input password matches hashed password saved in db
            const dbpassword = data.password;
            if (!Crypto.check(password, dbpassword)) {
                reply(Boom.unauthorized('Username or Password invalid'));
            }
        }
    }); 
}

exports.register.attributes = {
    name: 'routes-login'
};
