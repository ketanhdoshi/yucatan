'use strict';

// Load the HAPI-Swagger plugin to generate documentation for our API
module.exports.swagger = (server) => {
    // Include Hapi package with all its dependencies
    const Inert = require('inert');
    const Vision = require('vision');
    const HapiSwagger = require('hapi-swagger');

    // Define options for the plugin ( for documentation and testing )
    const options = {
        info: {
            'title': 'Test API Documentation',
            'version': '0.0.1'
        }
    };

    // Load the Hapi plugin and its dependent plugins into our server
    server.register([
        Inert,
        Vision,
        {
            'register': HapiSwagger,
            options
        }], (err) => {

        if (err) {
            server.log(['error'], 'hapi-swagger load error: ' + err);
        }
        else {
            server.log(['start'], 'hapi-swagger interface loaded');
        }
    });
};

// Load the Good plugin to help with Server Logging
module.exports.good = (server) => {

    const Good = require('good');

    // Define options for the Good plugin and load it into our server
    server.register({
        register: Good,
        options: {
            reporters: {
                console: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        // response: '*',
                        log: '*'
                    }]
                }, {
                    module: 'good-console'
                }, 'stdout']
            }
        }
    }, (err) => {

        if (err) {
            throw err; // something bad happened loading the plugin
        }
    });
};
