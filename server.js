'use strict';

// -----------------------------------------------
// This is our main file and the entry point for our server application.
// It creates the server, loads all plugins, defines the API routes and
// listens on a particular port for incoming connections
// -----------------------------------------------

// Include Hapi package 
const Hapi = require('hapi');

// -----------------------------------------------
// Create a server with a host and port
// -----------------------------------------------
const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 3000 
});

// -----------------------------------------------
// Callback function to define routes for our API
// Invoked after all plugins are loaded
// -----------------------------------------------
const registerRoutes = () => {
    server.log ('info', "registering routes");
    
    server.route([
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
        },
    ]);

    
    // APIs for each REST resource are defined in a separate plugin
    // Load all the plugins for our API
    server.register([  
        require('./routes/login'),
        require('./routes/user'),
        require('./routes/property')
    ], (err) => {
            if (err) {
                throw err;
            }
        }
    );
}

// -----------------------------------------------
// Load all required plugins and start the server
// -----------------------------------------------
server.register([
    {
        // Initialise authentication by loading our auth plugin
        // Any authentication approach we want to use is defined within that plugin
        register: require('./utils/auth'),
        options: {
            // Routes can be registered only after all auth schemes are registered
            // and the strategies created. This has to be done via a callback as
            // the registration is async 
            registerRoutes: registerRoutes
        }
    },
    {
        // Load the mongo db plugin
        register: require('./utils/mongo')
    }
    ], (err) => {
        if (err) { throw err; }
       
        // Start the server if plugins are loaded successfully
        server.start((err) => {
            if (err) {
                throw err;
            }
            server.log('info', `Server started at: ${server.info.uri} with [${Object.keys(server.plugins).join(', ')}] enabled`)
        });
    }
);

// -----------------------------------------------
// Initialise swagger and good-console
// -----------------------------------------------
const myutils = require ('./utils/util');
myutils.swagger (server);
myutils.good (server);

// TODO
// Create two endpoints - one for serving UI and static HTTP content and
// a second for API requests
// A connection can have a label attached to it (eg. "UI" and "API") and plugins
// can be loaded only on a connection with a specific label. So all API plugins
// should be loaded on the API connection. See server.select() in https://hapijs.com/tutorials/plugins?lang=en_US
