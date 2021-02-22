'use strict';

// -----------------------------------------------
// Examples of two authentication schemese viz. HTTP Basic and Cookie 
// which we won't use in the API. But the code is here for demo purposes
// in case it is useful at some point
// -----------------------------------------------

const Boom = require('@hapi/boom');   // for HTTP error codes
const Joi = require('joi');     // for parameter validation
const BasicCred = require('./basicCred'); // for basic user/pwd auth

// Plugin registration method
module.exports = {
    name: "try-auth",
    version: "1.0.0",
    register: async (server, options) => {
        
        BasicCred.hashpwd('ketan', 'hipwd');

        // Use HTTP Basic Auth. To test you only need to use this single route
        // The first time the browser will popup a dialog prompting you for the
        // username and password. Once you provide it the call goes through.
        // With Postman, provide the username/password in the Authorization header
        // for Basic Auth
        server.route({
            method: 'GET',
            path: '/api/tryauth/basic',
            options: {
                // Swagger documentation fields tags, description, note
                tags: ['api'],
                description: 'Basic Auth example',
                notes: 'Use Basic Auth to get dummy data',
                validate: {
                    // Query parameter
                    query: Joi.object({
                        name: Joi.string().required()
                    })
                },

                // Use HTTP Basic Auth for this route
                auth: 'basic',
                // !!!!!!! Should we move this up one level
                handler: (request, h) => {
                    // Use request.query since it is a query parameter
                    const message = 'Hello, ' + encodeURIComponent(request.query.name) + '!';
                    return {
                        statusCode: 200,
                        message: message
                    }
                }
            }
        });

        // First step of Cookie Auth is to call this API to set the cookie. Then
        // call an API which is authenticated by cookie auth. In a real scenario the
        // login API would set the cookie and the logout API would clear the cookie
        server.route({
            method: 'POST',
            path: '/api/tryauth/setcookie',
            options: {
                // Swagger documentation fields tags, description, note
                tags: ['api'],
                description: 'Cookie Auth example Step 1',
                notes: 'Cookie Auth example Step 1',
                validate: {
                    // Use Joi plugin to validate request
                    payload: Joi.object({
                        val: Joi.string().min(3).max(20).required(),
                    })
                }
            },
            handler: (request, h) => {
                // Get the val from the incoming request
                const val = encodeURIComponent(request.payload.val);

                // Set the cookie
                const cookieVal = { val: val };
                request.cookieAuth.set({ sid: cookieVal });

                return {
                    statusCode: 200,
                    message: 'Cookie set successfully to ' + val
                };
            }
        });

        server.route({
            method: 'GET',
            path: '/api/tryauth/clearcookie',
            options: {
                // Swagger documentation fields tags, description, note
                tags: ['api'],
                description: 'Cookie Auth example Step 3',
                notes: 'Cookie Auth example Step 3',
                validate: {
                }
            },
            handler: (request, h) => {
                // clear the session data
                request.cookieAuth.clear();

                return 'Logged out. See you around :)';
            }
        });
        
        
        // Use Cookie Auth. To test you first need to call the login route with a
        // username/password. That route sets the cookie and returns it to the client
        // Now you call this route and the cookie gets sent automatically by the browser
        server.route({
            method: 'GET',
            path: '/api/tryauth/cookie',
            options: {
                // Swagger documentation fields tags, description, note
                tags: ['api'],
                description: 'Cookie Auth example Step 2',
                notes: 'Use Cookie Auth to get dummy data. First call the setcookie API \n\
                        so that the cookie is set',
                validate: {
                    // Query parameter
                    query: Joi.object({
                        name: Joi.string().required()
                    })
                },
                auth: {
                    // Use HTTP Cookie Auth for this route
                    strategy: 'cookie',
                    mode: 'optional' // Needed for request.auth.isAuthenticated to work
                },
                handler: (request, h) => {
                    // Use request.query since it is a query parameter
                    let message = 'Hello, ' + encodeURIComponent(request.query.name) + '.';
                    if (request.auth.isAuthenticated) {
                        // session data available
                        const cookie = request.auth.credentials;                
                        message += ' Cookie is ' + JSON.stringify(cookie);
                    }
                    else {
                        message += ' Use setcookie API to set cookie';
                    }

                    return {
                        statusCode: 200,
                        message: message
                    };
                }
            }
        });
    }
};
