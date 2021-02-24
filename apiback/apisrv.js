'use strict';

// -----------------------------------------------
// This is our API Backend server. It loads the backend plugins
// and defines the API routes
// -----------------------------------------------
// Include Hapi package
const Hapi = require('@hapi/hapi');

const Cache = require('./utils/cache');    // Redis caching

// -----------------------------------------------
// Define routes for our API
// Invoked after all plugins are loaded
// -----------------------------------------------
const registerRoutes = async (apisrv) => {

    apisrv.log('info', 'registering routes');

    // APIs for each REST resource are defined in a separate plugin
    // Load all the plugins for our API
    await apisrv.register([
        require('./security/login'),
        require('./routes/user'),
        require('./routes/property'),
        require('./security/tryauth')
    ]);

    apisrv.log('info', 'Routes registered');
};

module.exports.init = async (host, port) => {

    // Create a server with a host and port
    const apisrv = new Hapi.Server({
        host: host,
        port: port,
        routes: {
            // Allow CORS response headers to be sent so a webapp can call us
            // Without this, axios API calls from the client app will not see the Authorization
            // header in the response
            cors: {
                origin: ['*'],
                headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'],
                exposedHeaders: ['WWW-Authenticate', 'Server-Authorization'],
                additionalExposedHeaders: ['Authorization']
            }
        }
    });

    // Export the server for automated testing
    module.exports = apisrv;

    // -----------------------------------------------
    // Load all required plugins
    // -----------------------------------------------
    await apisrv.register([
        {
            // Initialise authentication by loading our auth plugin
            // Any authentication approach we want to use is defined within that plugin
            plugin: require('./security/auth')
        },
        {
            // Load the Redis cache plugin
            plugin: require('./utils/cache'),
            options: {
                host: 'redis-18800.c74.us-east-1-4.ec2.cloud.redislabs.com',
                port: '18800',
                password: 'meraredis'
            }
        },
        {
            // Load the mongo db plugin
            plugin: require('./utils/mongo')
        }
    ]);

    // -----------------------------------------------
    // Initialise swagger and good-console
    // -----------------------------------------------
    const Myutils = require('./utils/util');
    await Myutils.swagger(apisrv);
    await Myutils.good(apisrv);

    // -----------------------------------------------
    // Register Routes - Routes can be registered only after all 
    // auth schemes are registered and the strategies created.
    await registerRoutes(apisrv);

    return apisrv;
}