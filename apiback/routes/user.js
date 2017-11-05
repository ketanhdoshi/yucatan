'use strict';

const Boom = require('boom');   // for HTTP error codes
const Joi = require('joi');     // for parameter validation
const Crypto = require('../security/crypto'); // for password encryption
// Import `user` mongoose db model from `models/user.js` file
const UserModel = require('../models/user');

// HAPI plugin that exposes all the REST APIs for the 'user' resource
// One route is defined for each API URL (+ HTTP verb)
// GET list, GET read, POST create, PUT update, DELETE

// Plugin registration method
exports.register = (server, options, next) => {

    // -----------------------------------------------
    // Get all users
    // -----------------------------------------------
    server.route({
        method: 'GET',
        path: '/api/user',
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Get All User data',
            notes: 'Get All User data',
            handler: function (request, reply) {
                // reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
                //Fetch all data from mongodb User Collection
                UserModel.find({}, (error, data) => {
                    // Callback method to handle results
                    // Return HTTP success or error code
                    if (error) {
                        reply(Boom.serverUnavailable('Internal MongoDB error', error));
                    }
                    else {
                        reply({
                            statusCode: 200,
                            message: 'User Data Successfully Fetched',
                            data
                        });
                    }
                });
            }
        }
    });

    // -----------------------------------------------
    // REST: Get a user by ID
    // -----------------------------------------------
    server.route({
        method: 'GET',
        //Getting data for particular user "/api/user/1212313123"
        path: '/api/user/{id}',
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Get specific user data',
            notes: 'Get specific user data',
            validate: {
                // Use Joi plugin to validate request
                params: {
                    //`id` is required string field
                    id: Joi.string().required()
                },
                headers:
                    Joi.object({
                        'authorization': Joi.string().required()
                    }).unknown()
            },
            auth: 'jwt'
        },
        handler: function (request, reply) {
            //Find user in db for particular userID
            UserModel.find({
                _id: request.params.id
            }, (error, data) => {
                // Callback method to handle results
                // Return HTTP success or error code
                if (error) {
                    reply(Boom.serverUnavailable('Internal MongoDB error', error));
                }
                else {
                    if (data.length === 0) {
                        // No data returned
                        reply(Boom.notFound());
                    }
                    else {
                        reply({
                            statusCode: 200,
                            message: 'User Data Successfully Fetched',
                            data
                        });
                    }
                }
            });
        }
    });

    // -----------------------------------------------
    // Create a user
    // -----------------------------------------------
    server.route({
        method: 'POST',
        path: '/api/user',
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Save user data',
            notes: 'Save user data',
            // We use Joi plugin to validate request
            validate: {
                // Use Joi plugin to validate request
                payload: {
                    username: Joi.string().min(3).max(20).required(),
                    // Client passes plaintext password over SSL
                    password: Joi.string().min(6).max(12).required(),
                    name: Joi.string().min(3).max(20).optional(),
                    scope: Joi.string().optional(),
                    oAuthUserId: Joi.string().optional(),
                }
            }
        },
        handler: function (request, reply) {
            exports.create(request.payload, 
                (error) => {
                    // Callback method to handle results
                    // Return HTTP success or error code
                    if (error) {
                        reply(Boom.serverUnavailable('Internal MongoDB error', error));
                    }
                    else {
                        reply({ statusCode: 201, message: 'User Saved Successfully' });
                    }
                }
            );
        }
    });

    // -----------------------------------------------
    // Update a user by ID
    // -----------------------------------------------
    server.route({
        method: 'PUT',
        path: '/api/user/{id}',
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Update specific user data',
            notes: 'Update specific user data',
            validate: {
                // Use Joi plugin to validate request
                params: {
                    //`id` is required field and can only accept string data
                    id: Joi.string().required()
                },
                payload: {
                    username: Joi.string().min(3).max(20).optional(),
                    password: Joi.string().min(6).max(12).optional(),
                    name: Joi.string().min(3).max(20).optional(),
                    scope: Joi.string().optional()
                }
            },
            handler: function (request, reply) {

                // encrypt password before saving.
                if (request.payload.password) {
                    request.payload.password = Crypto.hash(request.payload.password);
                }

                // Find the user by ID in the db and update it
                UserModel.findOneAndUpdate({
                    _id: request.params.id
                },
                    request.payload, // values to be updated
                    (error, data) => {
                        // Callback method to handle results
                        // Return HTTP success or error code
                        if (error) {
                            reply(Boom.serverUnavailable('Internal MongoDB error', error));
                        }
                        else {
                            reply({
                                statusCode: 200,
                                message: 'User Updated Successfully',
                                data
                            });
                        }
                    }
                );
            }
        }
    });

    // -----------------------------------------------
    // Delete a user by ID
    // -----------------------------------------------
    server.route({
        method: 'DELETE',
        path: '/api/user/{id}',
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Remove specific user data',
            notes: 'Remove specific user data',
            validate: {
                // Use Joi plugin to validate request
                params: {
                    id: Joi.string().required()
                }
            }
        },
        handler: function (request, reply) {
            // Delete the particular record from db
            UserModel.findOneAndRemove({
                _id: request.params.id
            },
                // Callback method to handle results
                (error) => {

                    // Return HTTP success or error code
                    if (error) {
                        reply(Boom.serverUnavailable('Internal MongoDB error', error));
                    }
                    else {
                        reply({
                            statusCode: 200,
                            message: 'User Deleted Successfully'
                        });
                    }
                }
            );
        }
    });

    // Next must be called at the end of register
    return next();
};

// Plugin registration attributes
exports.register.attributes = {
    name: 'routes-users'
};

// -----------------------------------------------
// Create a user in the database
// -----------------------------------------------
exports.create = (userObj, cb) => {
    // encrypt password before saving.
    userObj.password = Crypto.hash(userObj.password);

    // Create mongodb user object to save it into database
    const user = new UserModel(userObj);

    // Save data into database
    user.save(cb);
}

