'use strict';

const Boom = require('@hapi/boom');   // for HTTP error codes
const Joi = require('joi');     // for parameter validation
const Crypto = require('../security/crypto'); // for password encryption
// Import `user` mongoose db model from `models/user.js` file
const UserModel = require('../models/user');

// HAPI plugin that exposes all the REST APIs for the 'user' resource
// One route is defined for each API URL (+ HTTP verb)
// GET list, GET read, POST create, PUT update, DELETE

// Plugin registration method
exports.plugin = {
    name: "routes-users",
    version: "1.0.0",
    register: async (server, options) => {

        // -----------------------------------------------
        // Get all users
        // -----------------------------------------------
        server.route({
            method: 'GET',
            path: '/api/user',
            options: {
                // Swagger documentation fields tags, description, note
                tags: ['api'],
                description: 'Get All User data',
                notes: 'Get All User data'
            },
            handler: async (request, h) => {
                // reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
                //Fetch all data from mongodb User Collection
                try {
                    const res = await UserModel.find({});
                    return {
                        statusCode: 200,
                        message: 'User Data Successfully Fetched',
                        res
                    };
                } catch (error) {
                    return Boom.serverUnavailable('Internal MongoDB error', error);
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
            options: {
                // Swagger documentation fields tags, description, note
                tags: ['api'],
                description: 'Get specific user data',
                notes: 'Get specific user data',
                validate: {
                    // Use Joi plugin to validate request
                    params: Joi.object({
                        //`id` is required string field
                        id: Joi.string().required()
                    }),
                    headers: Joi.object({
                            'authorization': Joi.string().required()
                        }).unknown()
                },
                auth: 'jwt'
            },
            handler: async (request, h) => {
                try {
                    //Find user in db for particular userID
                    const res = await UserModel.find({_id: request.params.id});
                    if (res.length === 0) {
                        // No data returned
                        return Boom.notFound();
                    }
                    else {
                        return {
                            statusCode: 200,
                            message: 'User Data Successfully Fetched',
                            res
                        };
                    }

                } catch (err) {
                    return Boom.serverUnavailable('Internal MongoDB error', err);
                }
            }
        });

        // -----------------------------------------------
        // Create a user
        // -----------------------------------------------
        server.route({
            method: 'POST',
            path: '/api/user',
            options: {
                // Swagger documentation fields tags, description, note
                tags: ['api'],
                description: 'Save user data',
                notes: 'Save user data',
                // We use Joi plugin to validate request
                validate: {
                    // Use Joi plugin to validate request
                    payload: Joi.object({
                        username: Joi.string().min(3).max(20).required(),
                        // Client passes plaintext password over SSL
                        password: Joi.string().min(6).max(12).required(),
                        name: Joi.string().min(3).max(20).optional(),
                        scope: Joi.string().optional(),
                        oAuthUserId: Joi.string().optional(),
                    })
                }
            },
            handler: async (request, h) => {
                try {
                    await exports.create(request.payload);
                    return { statusCode: 201, message: 'User Saved Successfully' };
                } catch (error) {
                    return Boom.serverUnavailable('Internal MongoDB error', error);
                }
            }
        });

        // -----------------------------------------------
        // Update a user by ID
        // -----------------------------------------------
        server.route({
            method: 'PUT',
            path: '/api/user/{id}',
            options: {
                // Swagger documentation fields tags, description, note
                tags: ['api'],
                description: 'Update specific user data',
                notes: 'Update specific user data',
                validate: {
                    // Use Joi plugin to validate request
                    params: Joi.object({
                        //`id` is required field and can only accept string data
                        id: Joi.string().required()
                    }),
                    payload: Joi.object({
                        username: Joi.string().min(3).max(20).optional(),
                        password: Joi.string().min(6).max(12).optional(),
                        name: Joi.string().min(3).max(20).optional(),
                        scope: Joi.string().optional()
                    })
                },
                handler: async (request, h) => {
                    try {
                        // encrypt password before saving.
                        if (request.payload.password) {
                            request.payload.password = await Crypto.hash(request.payload.password);
                        }
                        // Find the user by ID in the db and update it
                        const res = await UserModel.findOneAndUpdate(
                            {_id: request.params.id},
                            request.payload // values to be updated
                        );
                        return {
                            statusCode: 200,
                            message: 'User Updated Successfully',
                            res
                        };
                    } catch (error) {
                        return Boom.serverUnavailable('Internal MongoDB error', error);
                    }
                }
            }
        });

        // -----------------------------------------------
        // Delete a user by ID
        // -----------------------------------------------
        server.route({
            method: 'DELETE',
            path: '/api/user/{id}',
            options: {
                // Swagger documentation fields tags, description, note
                tags: ['api'],
                description: 'Remove specific user data',
                notes: 'Remove specific user data',
                validate: {
                    // Use Joi plugin to validate request
                    params: Joi.object({
                        id: Joi.string().required()
                    })
                }
            },
            handler: async (request, h) => {
                try {
                    // Delete the particular record from db
                    const res = await UserModel.findOneAndRemove({_id: request.params.id});
                    return {
                        statusCode: 200,
                        message: 'User Deleted Successfully'
                    };
                } catch (error) {
                    return Boom.serverUnavailable('Internal MongoDB error', error);
                }
            }
        });
    }
};

// -----------------------------------------------
// Create a user in the database
// -----------------------------------------------
exports.create = async (userObj) => {
    // encrypt password before saving.
    userObj.password = await Crypto.hash(userObj.password);

    // Create mongodb user object to save it into database
    const user = new UserModel(userObj);

    // Save data into database
    await user.save();
}

