'use strict';

const Boom = require('@hapi/boom');   // for HTTP error codes
const Joi = require('joi');     // for parameter validation

// HAPI plugin that exposes all the REST APIs for the 'property' resource
// One route is defined for each API URL (+ HTTP verb)
// GET list, GET read, POST create, PUT update, DELETE

// Plugin registration method
module.exports = {
    name: "routes-properties",
    version: "1.0.0",
    register: async (server, options) => {

        // Importing `property` mongoose db model
        const PropertyModel = require('../models/property');

        // REST: Get all properties
        server.route({
            method: 'GET',
            path: '/api/property',
            options: {
                // Swagger documentation fields tags, description, note
                tags: ['api'],
                description: 'Get All Property data',
                notes: 'Get All Property data',
                validate: {
                    headers:
                        Joi.object({
                            'authorization': Joi.string().required()
                        }).unknown()
                },
                auth: 'jwt'
            },
            handler: async (request, h) => {
                try {
                    server.log('info', 'GET /api/property called');

                    //Fetch all data from mongodb Property Collection
                    const res = await PropertyModel.find({});

                    server.log('info', 'DB results received');
                    return {
                        statusCode: 200,
                        message: 'Property Data Successfully Fetched',
                        res
                    };
                } catch (error) {
                    return Boom.serverUnavailable('Internal MongoDB error', error);
                }
            }
        });

        // REST: Get a property by ID
        server.route({
            method: 'GET',
            //Getting data for particular property "/api/property/1212313123"
            path: '/api/property/{id}',
            options: {
                // Swagger documentation fields tags, description, note
                tags: ['api'],
                description: 'Get specific property data',
                notes: 'Get specific property data',
                validate: {
                    // Use Joi plugin to validate request
                    params: Joi.object({
                        //`id` is required string field
                        id: Joi.string().required()
                    }),
                    headers:
                        Joi.object({
                            'authorization': Joi.string().required()
                        }).unknown()
                },
                auth: 'jwt'
            },
            handler: async (request, h) => {
                try {
                    //Find property in db for particular propertyID
                    const res = await PropertyModel.find({_id: request.params.id});
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
                } catch (error) {
                    return Boom.serverUnavailable('Internal MongoDB error', error);
                }
            }
        });

        // REST Create a property
        server.route({
            method: 'POST',
            path: '/api/property',
            options: {
                // Swagger documentation fields tags, description, note
                tags: ['api'],
                description: 'Save property data',
                notes: 'Save property data',

                validate: {
                    // Use Joi plugin to validate request
                    payload: Joi.object({
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
                    }),
                    headers:
                        Joi.object({
                            'authorization': Joi.string().required()
                        }).unknown()
                },
                auth: 'jwt'
            },
            handler: async (request, h) => {
                try {
                    // Create mongodb property object to save it into database
                    const property = new PropertyModel(request.payload);

                    // Save data into database
                    const res = await property.save();
                    return { 
                        statusCode: 201, 
                        message: 'Property Saved Successfully',
                        res
                    };
                } catch (error) {
                    return Boom.serverUnavailable('Internal MongoDB error', error);
                }
            }
        });

        // REST Update a property by ID
        server.route({
            method: 'PUT',
            path: '/api/property/{id}',
            options: {
                // Swagger documentation fields tags, description, note
                tags: ['api'],
                description: 'Update specific property data',
                notes: 'Update specific property data',
                validate: {
                    // Use Joi plugin to validate request
                    params: Joi.object({
                        //`id` is required field and can only accept string data
                        id: Joi.string().required()
                    }),
                    payload: Joi.object({
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
                    }),
                    headers:
                        Joi.object({
                            'authorization': Joi.string().required()
                        }).unknown()
                },
                auth: 'jwt'
            },
            handler: async (request, h) => {
                try {
                    // Find the property by ID in the db and update it
                    const res = await PropertyModel.findOneAndUpdate(
                        {_id: request.params.id},
                        request.payload // values to be updated
                    );
                    return {
                        statusCode: 200,
                        message: 'Property Updated Successfully',
                        res
                    };
                } catch (error) {
                    return Boom.serverUnavailable('Internal MongoDB error', error);
                }
            }
        });

        // REST Delete a property by ID
        server.route({
            method: 'DELETE',
            path: '/api/property/{id}',
            options: {
                // Swagger documentation fields tags, description, note
                tags: ['api'],
                description: 'Remove specific property data',
                notes: 'Remove specific property data',
                validate: {
                    // Use Joi plugin to validate request
                    params: Joi.object({
                        id: Joi.string().required()
                    }),
                    headers:
                        Joi.object({
                            'authorization': Joi.string().required()
                        }).unknown()
                },
                auth: 'jwt'
            },
            handler: async(request, reply) => {
                try {
                    // Delete the particular record from db
                    const res = await PropertyModel.findOneAndRemove(
                        {_id: request.params.id}
                    );
                    return {
                        statusCode: 200,
                        message: 'Property Deleted Successfully',
                        res
                    };
                } catch (error) {
                    return Boom.serverUnavailable('Internal MongoDB error', error);
                }
            }
        });
    }
};
