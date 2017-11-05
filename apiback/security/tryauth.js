'use strict';

// -----------------------------------------------
// Examples of two authentication schemese viz. HTTP Basic and Cookie 
// which we won't use in the API. But the code is here for demo purposes
// in case it is useful at some point
// -----------------------------------------------

const Boom = require('boom');   // for HTTP error codes
const Joi = require('joi');     // for parameter validation
const BasicCred = require('./basicCred'); // for basic user/pwd auth

// Plugin registration method
exports.register = function (server, options, next) {
    
    BasicCred.hashpwd('ketan', 'hipwd');

    // Use HTTP Basic Auth. To test you only need to use this single route
    // The first time the browser will popup a dialog prompting you for the
    // username and password. Once you provide it the call goes through
    server.route({
        method: 'GET',
        path: '/api/tryauth/basic',
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Basic Auth example',
            notes: 'Use Basic Auth to get dummy data',
            validate: {
                // Query parameter
                query: {
                    name: Joi.string().required()
                }
            },

            // Use HTTP Basic Auth for this route
            auth: 'basic',
            handler: function (request, reply) {
                // Use request.query since it is a query parameter
                const message = 'Hello, ' + encodeURIComponent(request.query.name) + '!';
                reply({
                    statusCode: 200,
                    message: message
                 });
            }
        }
    });

    // First step of Cookie Auth is to call this API to set the cookie. Then
    // call an API which is authenticated by cookie auth. In a real scenario the
    // login API would set the cookie and the logout API would clear the cookie
    server.route({
        method: 'POST',
        path: '/api/tryauth/setcookie',
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Cookie Auth example Step 1',
            notes: 'Cookie Auth example Step 1',
            validate: {
                // Use Joi plugin to validate request
                payload: {
                    val: Joi.string().min(3).max(20).required(),
                }
            }
        },
        handler: function (request, reply) {

            // Get the val from the incoming request
            const val = encodeURIComponent(request.payload.val);

            // Set the cookie
            const cookieVal = { val: val };
            request.cookieAuth.set({ sid: cookieVal });

            reply({
                statusCode: 200,
                message: 'Cookie set successfully to ' + val
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/api/tryauth/clearcookie',
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Cookie Auth example Step 3',
            notes: 'Cookie Auth example Step 3',
            validate: {
            }
        },
        handler: function (request, reply) {
            // clear the session data
            request.cookieAuth.clear();

            reply('Logged out. See you around :)');
        }
    });
    
    
    // Use Cookie Auth. To test you first need to call the login route with a
    // username/password. That route sets the cookie and returns it to the client
    // Now you call this route and the cookie gets sent automatically by the browser
    server.route({
        method: 'GET',
        path: '/api/tryauth/cookie',
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Cookie Auth example Step 2',
            notes: 'Use Cookie Auth to get dummy data. First call the setcookie API \n\
                    so that the cookie is set',
            validate: {
                // Query parameter
                query: {
                    name: Joi.string().required()
                }
            },
            auth: {
                // Use HTTP Cookie Auth for this route
                strategy: 'cookie',
                mode: 'optional' // Needed for request.auth.isAuthenticated to work
            },
            handler: function (request, reply) {
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

                reply({
                    statusCode: 200,
                    message: message
                });
            }
        }
    });

    // Next must be called at the end of register
    return next();
};

// Plugin registration attributes
exports.register.attributes = {
    name: 'try-auth'
};
