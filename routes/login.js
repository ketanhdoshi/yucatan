'use strict';

const Boom = require('boom');   // for HTTP error codes
const Joi = require('joi');     // for parameter validation
const Crypto = require ('../utils/crypto'); // for password encryption

const jwt = require('jsonwebtoken');
function getToken (id) {
  let secretKey = 'NeverShareYourSecret';

  return jwt.sign({
    id: id
  }, secretKey, {expiresIn: '18h'});
}

// HAPI plugin that exposes all the REST APIs for login/logout
// One route is defined for each API URL

exports.register = function(server, options, next) {

    // Import `user` mongoose db model from `models/user.js` file 
    var UserModel = require('../models/user');

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
            var username = request.payload.username;
            var password = request.payload.password;
            
            //Find user in db for particular username
            UserModel.findOne ({
                username: username
            }, function (error, data) {
                console.log ("in login callback ", error, data)
                
                if (error) {
                    reply (Boom.serverUnavailable ('Internal Mongo error'), error);
                } else if (data == null) {
                    // No matching user
                    reply (Boom.unauthorized ('Username or Password invalid'));
                } else {
                    // Check if user input password matches hashed password saved in db
                    let dbpassword = data.password;
                    if (!Crypto.check (password, dbpassword)) {
                        reply (Boom.unauthorized ('Username or Password invalid'));
                    } else {                        
                        // Use Cookie authentication strategy (not related to JWT)
                        console.log ("Setting cookie ");
                        var val = {hello: "me"};
                        request.cookieAuth.set({sid: val});
                        
                        // Create a JWT token and send it in the response
                        let token = getToken (data._id);
                        reply ({
                            statusCode: 200,
                            message: 'Succesful login',
                            data: {token: token}
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
            request.cookieAuth.clear()

            reply('Logged out. See you around :)')
        }
    });

    return next();
};

exports.register.attributes = {  
  name: 'routes-login'
};