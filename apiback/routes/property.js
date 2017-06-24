'use strict';

const Boom = require('boom');   // for HTTP error codes
const Joi = require('joi');     // for parameter validation

// HAPI plugin that exposes all the REST APIs for the 'property' resource
// One route is defined for each API URL (+ HTTP verb)
// GET list, GET read, POST create, PUT update, DELETE

// Plugin registration method
exports.register = function (server, options, next) {

    // Importing `property` mongoose db model
    const PropertyModel = require('../models/property');

    // REST: Get all properties
    server.route({
        method: 'GET',
        path: '/api/property',
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Get All Property data',
            notes: 'Get All Property data'
        },
        handler: function (request, reply) {

            server.log('info', 'GET /api/property called');

            //Fetch all data from mongodb Property Collection
            PropertyModel.find({}, (error, data) => {

                server.log('info', 'DB results received');
                // Callback method to handle results
                // Return HTTP success or error code
                if (error) {
                    reply(Boom.serverUnavailable('Internal MongoDB error', error));
                }
                else {
                    reply({
                        statusCode: 200,
                        message: 'Property Data Successfully Fetched',
                        data
                    });
                }
            });
        }
    });

    // REST: Get a property by ID
    server.route({
        method: 'GET',
        //Getting data for particular property "/api/property/1212313123"
        path: '/api/property/{id}',
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Get specific property data',
            notes: 'Get specific property data',
            validate: {
                // Use Joi plugin to validate request
                params: {
                    //`id` is required string field
                    id: Joi.string().required()
                }
            }
        },
        handler: function (request, reply) {
            //Find property in db for particular propertyID
            PropertyModel.find({
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

    // REST Create a property
    server.route({
        method: 'POST',
        path: '/api/property',
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Save property data',
            notes: 'Save property data',

            validate: {
                // Use Joi plugin to validate request
                payload: {
                    address: {
                        locality: Joi.string().required(),
                        region: Joi.string().optional(),
                        country: Joi.string().required(),
                        postalCode: Joi.string().optional()
                    },
                    houseType: Joi.string().required().valid('Apartment', 'Bungalow', 'Castle', 'Loft', 'Tent'),
                    roomType: Joi.string().required().valid('Entire House', 'Private Room', 'Shared Room'),
                    description: Joi.string().required(),
                    rooms: Joi.number().min(0).max(20).required(),
                    photos: Joi.array().items(Joi.string().uri()),
                    price: Joi.number().required(),
                    amenities: Joi.array().items(Joi.string().valid('AC', 'Garden', 'Internet', 'Wifi', 'Pool', 'Washer')),
                    owner: Joi.string().required()
                }
            }
        },
        handler: function (request, reply) {

            // Create mongodb property object to save it into database
            const property = new PropertyModel(request.payload);

            // Save data into database
            property.save((error) => {
                // Callback method to handle results
                // Return HTTP success or error code
                if (error) {
                    reply(Boom.serverUnavailable('Internal MongoDB error', error));
                }
                else {
                    reply({ statusCode: 201, message: 'Property Saved Successfully' });
                }
            });
        }
    });

    // REST Update a property by ID
    server.route({
        method: 'PUT',
        path: '/api/property/{id}',
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Update specific property data',
            notes: 'Update specific property data',
            validate: {
                // Use Joi plugin to validate request
                params: {
                    //`id` is required field and can only accept string data
                    id: Joi.string().required()
                },
                payload: {
                    address: {
                        locality: Joi.string().optional(),
                        region: Joi.string().optional(),
                        country: Joi.string().optional(),
                        postalCode: Joi.string().optional()
                    },
                    houseType: Joi.string().optional().valid('Apartment', 'Bungalow', 'Castle', 'Loft', 'Tent'),
                    roomType: Joi.string().optional().valid('Entire House', 'Private Room', 'Shared Room'),
                    description: Joi.string().optional(),
                    rooms: Joi.number().min(0).max(20).optional(),
                    photos: Joi.array().items(Joi.string().uri()),
                    price: Joi.number().optional(),
                    amenities: Joi.array().items(Joi.string().valid('AC', 'Garden', 'Internet', 'Wifi', 'Pool', 'Washer')),
                    owner: Joi.string().optional()
                }
            }
        },
        handler: function (request, reply) {
            // Find the property by ID in the db and update it
            PropertyModel.findOneAndUpdate({
                _id: request.params.id
            },
                request.payload, // values to be updated

                // Callback method to handle results
                (error, data) => {
                    // Return HTTP success or error code
                    if (error) {
                        reply(Boom.serverUnavailable('Internal MongoDB error', error));
                    }
                    else {
                        reply({
                            statusCode: 200,
                            message: 'Property Updated Successfully',
                            data
                        });
                    }
                }
            );
        }
    });

    // REST Delete a property by ID
    server.route({
        method: 'DELETE',
        path: '/api/property/{id}',
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Remove specific property data',
            notes: 'Remove specific property data',
            validate: {
                // Use Joi plugin to validate request
                params: {
                    id: Joi.string().required()
                }
            }
        },
        handler: function (request, reply) {
            // Delete the particular record from db
            PropertyModel.findOneAndRemove({
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
    name: 'routes-properties'
};
