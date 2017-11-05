'use strict';

// -----------------------------------------------
// This is our API Backend server. It loads the backend plugins
// and defines the API routes
// -----------------------------------------------
var apisrv = null;

const Cache = require('./utils/cache');    // Redis caching

// -----------------------------------------------
// Callback function to define routes for our API
// Invoked after all plugins are loaded
// -----------------------------------------------
const registerRoutes = () => {

    apisrv.log('info', 'registering routes');

    // APIs for each REST resource are defined in a separate plugin
    // Load all the plugins for our API
    apisrv.register([
        require('./security/login'),
        require('./routes/user'),
        require('./routes/property'),
        require('./security/tryauth')
    ], (err) => {

        if (err) {
            throw err;
        }
        apisrv.log('info', 'Routes registered');
    }
    );
};

module.exports.init = (server, port, doneCB) => {

    apisrv = server.connection({
        host: 'localhost',
        port: port,
        labels: 'apisrv',
        routes: { 
            cors: true // allow CORS response headers to be sent so a webapp can call us
        }
    });

    // -----------------------------------------------
    // Load all required plugins and start the server
    // -----------------------------------------------
    apisrv.register([
        {
            // Initialise authentication by loading our auth plugin
            // Any authentication approach we want to use is defined within that plugin
            register: require('./security/auth'),
            options: {
                // Routes can be registered only after all auth schemes are registered
                // and the strategies created. This has to be done via a callback as
                // the registration is async
                registerRoutes
            }
        },
        {
            // Load the Redis cache plugin
            register: require('./utils/cache'),
            options: {
                host: 'redis-18518.c12.us-east-1-4.ec2.cloud.redislabs.com',
                port: '18518'
            }
        },
        {
            // Load the mongo db plugin
            register: require('./utils/mongo')
        }
    ], doneCB
    );

    // -----------------------------------------------
    // Initialise swagger and good-console
    // -----------------------------------------------
    const Myutils = require('./utils/util');
    Myutils.swagger(apisrv);
    Myutils.good(apisrv);
}