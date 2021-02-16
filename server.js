'use strict';

// -----------------------------------------------
// This is our main file and the entry point for our server application.
// It creates the two separate backends, one for the Web UI and another
// for the API, and listens on two separate ports for incoming connections
// -----------------------------------------------

const WebSrv = require ('./webback/websrv');
const ApiSrv = require ('./apiback/apisrv');

// -----------------------------------------------
// -----------------------------------------------
const host = 'localhost';
const port = 3010;

// -----------------------------------------------
// Start the Web Backend server and the API Backend server
// -----------------------------------------------
const webStart = async () => {
    // Create the server
    const websrv = await WebSrv.init(host, port);

    // Start the server if plugins are loaded successfully
    await websrv.start();

    console.log('Web Server running on %s', websrv.info.uri);
}

const apiStart = async () => {
    // Create the server
    const apisrv = await ApiSrv.init(host, port + 1);

    // Start the server if plugins are loaded successfully
    await apisrv.start();

    console.log('API Server running on %s', apisrv.info.uri);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

// apiStart();
webStart();

