'use strict';

const Boom = require('@hapi/boom');   // for HTTP error codes
const Joi = require('joi');     // for parameter validation
const Crypto = require('./crypto'); // for password encryption
const Token = require('./token'); // for tokens

// -----------------------------------------------
// Plugin that exposes all the REST APIs for login/logout
// One route is defined for each API URL
// -----------------------------------------------

module.exports = {
    name: "routes-login",
    version: "1.0.0",
    register: async (server, options) => {

        // Import `user` mongoose db model from `models/user.js` file
        const UserModel = require('../models/user');
        
        // -----------------------------------------------
        // Login using local authentication via the user database
        // -----------------------------------------------    
        server.route({
            method: 'POST',
            path: '/api/login/local',
            options: {
                // Swagger documentation fields tags, description, note
                tags: ['api'],
                description: 'User login with username/password',
                notes: 'User login with username/password that is validated via the\n\
                            local user database',
                validate: {
                    // Use Joi plugin to validate request
                    payload: Joi.object({
                        username: Joi.string().min(3).max(20).required(),
                        password: Joi.string().min(6).max(12).required()
                    })
                }
            },
            handler: async(request, h) => {
                try {
                    // Get username and password from the incoming request
                    // TODO: The password is passed in cleartext. It should be encrypted
                    const username = request.payload.username;
                    const password = request.payload.password;

                    //Find user in db for particular username
                    const res = await UserModel.findOne({username});

                    if (res === null) {
                        // No matching user
                        return Boom.unauthorized('Username or Password invalid');
                    }

                    // Check if user input password matches hashed password saved in db
                    const dbpassword = data.password;
                    if (!Crypto.check(password, dbpassword)) {
                        return Boom.unauthorized('Username or Password invalid');
                    }
                    else {
                        // TODO: Using toString here because data._id is an ObjectId and
                        // redis complains about nested objects. Figure out how to not
                        // use toString here.
                        const userProfile = {
                            userId: data._id.toString(),
                            userName: data.username,
                            scope: data.scope   // user role
                        };

                        // Create a JWT token and send it in the response
                        const jwt = loginSuccess (userProfile, null);
                        return h.response ({
                            statusCode: 200,
                            message: 'Succesful login'
                        }.header("Authorization", jwt);                
                    }
                } catch (error) {
                    return Boom.serverUnavailable('Internal Mongo error', error);
                }
            }
        });

        // -----------------------------------------------
        // Logout API
        // It needs the Authorization header to identify the user who must
        // be logged out. An alternate approach would be to use an API like
        // /api/logout/{userId}
        // -----------------------------------------------    
        server.route({
            method: 'GET',
            path: '/api/logout',
            options: {
                // Swagger documentation fields tags, description, note
                tags: ['api'],
                description: 'User logout',
                notes: 'User logout',
                validate: {
                    headers:
                        Joi.object({
                            'authorization': Joi.string().required()
                        }).unknown()
                },
                auth: 'jwt'
            },
            handler: (request, h) => {
                doLogout (request.auth.credentials);
                return h.response('Logged out. See you around :)').header("Authorization", '');
            }
        });

        // -----------------------------------------------
        // Login using 3rd party Oauth authentication with Github
        // -----------------------------------------------    
        server.route({
            method: 'GET',
            path: '/api/login/github',
            options: {
                // Swagger documentation fields tags, description, note
                tags: ['api'],
                description: 'Github login',
                notes: 'Github login',
                auth: 'github',
                handler: async (request, h) => {

                    // User did not get authenticated
                    if (!request.auth.isAuthenticated) {
                        return reply(Boom.unauthorized('Authentication failed: ' + request.auth.error.message));
                    }

                    // Get the github access and refresh tokens
                    const creds = request.auth.credentials;
                    const token = {
                        access: creds.token,
                        expiry: creds.expiresIn,
                        refresh: creds.refreshToken
                    };
                    
                    // Get the github user profile details
                    const profile = creds.profile;
                    const oAuthUserId = profile.id;
                    
                    //Find user in db by oAuthUserId
                    UserModel.findOne({
                        oAuthUserId
                    }, (error, data) => {
                        if (error) {
                            reply(Boom.serverUnavailable('Internal Mongo error'), error);
                        }
                        else if (data === null) {
                            // No matching user
                            reply(Boom.unauthorized('User invalid'));
                        }
                        else {
                            // NB: data.username should match profile.username and
                            // data.name should match profile.displayName
                            const userProfile = {
                                userId: data._id.toString(),
                                userName: data.username,
                                scope: data.scope   // user role
                            };

                            const jwt = loginSuccess (userProfile, token);
                            console.log ('jwt is ', jwt);
                            return reply(
                                {
                                    statusCode: 200,
                                    message: 'Succesful login'
                                }
                            ).header("Authorization", jwt);
                        }
                    });
                }
            }
        });
    }
};

// -----------------------------------------------
// All the /api/login/* routes will first lookup the credentials. If successful
// they will populate a user profile object and optionally an access token. If failure
// they will populate an error message. This part is done in a way that is specific
// for each login type
// After that they all call the this same loginDone function for common processing
// -----------------------------------------------
const loginSuccess = (userProfile, token) => {
    
    if (!token) {
        // For locally authenticated users generate an access token. Users 
        // authenticated by Oauth will get an access token from the 3rd party
        token = Token.create (userProfile);
    }

    const jwt = Token.createJwt (userProfile, token);
    
    // return token and user Profile to caller
    return jwt;
}

// -----------------------------------------------
// Clear the token and cache
// -----------------------------------------------
const doLogout = (credentials) => {
    // Get the data from the decoded JWT token, which is preserved in
    // the Request's Credentials object
    const {userId, access} = credentials;
    Token.deleteJwt (userId, access);
}
    
    // -----------------------------------------------
    // Basic Auth Login
    // <Web> = http://localhost:3010
    // <Api> = http://localhost:3011
    // In the Web UI, <Web>:/login will open a Sign In window where you have a
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

// -----------------------------------------------
// -----------------------------------------------
const loginOauth = () => {
}

// -----------------------------------------------
// The signup flow for Oauth should create a user in our local database with
// the username, name and oAuthUserId fields being populated from the Oauth profile.
// The local password can be a dummy value, and the scope can take the default
// -----------------------------------------------
const signupOauth = () => {
}

function GetUser () {
}

function GetRole () {
}

