'use strict';

// Register the HAPI-Swagger plugin and its dependencies to generate 
// documentation for our API
module.exports.swagger = async (apisrv) => {
    // Include Hapi package with all its dependencies
    await apisrv.register([
        {
            // Load the Inert plugin
            plugin: require('@hapi/inert')
        },
        {
            // Load the Vision plugin
            plugin: require('@hapi/vision')
        },
        {
            // Load the Hapi Swagger plugin
            plugin: require('hapi-swagger'),
            // Plugin options (for documentation and testing)
            options: {
                info: {
                    title: 'Test API Documentation',
                    version: '0.0.1'
                }
            }
        }     
    ]);
};

// Load the Good plugin to help with Server Logging
module.exports.good = async (apisrv) => {

    await apisrv.register({
        plugin: require('@hapi/good'),
        // Define options for the Good plugin
        options: {
            reporters: {
                console: [{
                    module: '@hapi/good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        // response: '*',
                        log: '*'
                    }]
                }, 
                {
                    module: '@hapi/good-console'
                }, 'stdout']
            }
        }
    });
};
