'use strict';

// -----------------------------------------------
// This is our main file and the entry point for our server application.
// It creates the two separate backends, one for the Web UI and another
// for the API, and listens on two separate ports for incoming connections
// -----------------------------------------------

// Include Hapi package
const Hapi = require('hapi');

const WebSrv = require ('./webback/websrv');
const ApiSrv = require ('./apiback/apisrv');

// -----------------------------------------------
// Create a server with a host and port
// -----------------------------------------------
const server = new Hapi.Server();
const port = 3010;

// Export the server for automated testing
module.exports = server;

// -----------------------------------------------
// Start the Web Backend server and the API Backend server
// -----------------------------------------------
WebSrv.init(server, port);
ApiSrv.init(server, port + 1, (err) => {
    if (err) {

        throw err;
    }

    // Start the server if plugins are loaded successfully
    server.start((err) => {

        if (err) {

            throw err;
        }
        console.log ('info', 'Server started at', port + 1);
        // apisrv.log('info', `Server started at: ${apisrv.info.uri} with [${Object.keys(apisrv.plugins).join(', ')}] enabled`);
    });    
});