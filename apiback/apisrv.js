'use strict';

// -----------------------------------------------
// This is our API Backend server. It loads the backend plugins
// and defines the API routes
// -----------------------------------------------
var apisrv = null;

// -----------------------------------------------
// Callback function to define routes for our API
// Invoked after all plugins are loaded
// -----------------------------------------------
const registerRoutes = () => {

    apisrv.log('info', 'registering routes');

    // This can be removed, only used for a PoC
    apisrv.route([
        {
            method: 'GET',
            path: '/auth-cookie-test',
            config: {
                handler: function (request, reply) {

                    reply('<html><head><title>Login page</title></head><body>' +
            '<form method="post" action="/api/login">' +
            'Username: <input type="text" name="username"><br>' +
            'Password: <input type="password" name="password"><br/>' +
            '<input type="submit" value="Login"></form></body></html>');
                }
            }
        }
    ]);


    // APIs for each REST resource are defined in a separate plugin
    // Load all the plugins for our API
    apisrv.register([
        require('./routes/login'),
        require('./routes/user'),
        require('./routes/property')
    ], (err) => {

        if (err) {
            throw err;
        }
        apisrv.log('info', 'Routes registered');
    }
    );
};

module.exports.init = (server, port) => {

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
            register: require('./utils/auth'),
            options: {
                // Routes can be registered only after all auth schemes are registered
                // and the strategies created. This has to be done via a callback as
                // the registration is async
                registerRoutes
            }
        },
        {
            // Load the mongo db plugin
            register: require('./utils/mongo')
        }
    ], (err) => {

        if (err) {

            throw err;
        }

        // Start the server if plugins are loaded successfully
        server.start((err) => {

            if (err) {

                throw err;
            }
            apisrv.log('info', `Server started at: ${apisrv.info.uri} with [${Object.keys(apisrv.plugins).join(', ')}] enabled`);
        });
    });

    // -----------------------------------------------
    // Initialise swagger and good-console
    // -----------------------------------------------
    const Myutils = require('./utils/util');
    Myutils.swagger(apisrv);
    Myutils.good(apisrv);
}