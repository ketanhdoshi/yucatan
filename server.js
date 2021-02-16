'use strict';

// -----------------------------------------------
// This is our main file and the entry point for our server application.
// It creates the two separate backends, one for the Web UI and another
// for the API, and listens on two separate ports for incoming connections
// -----------------------------------------------

// -----------------------------------------------
// -----------------------------------------------
const host = 'localhost';
const port = 3010;

// -----------------------------------------------
// Start the Web Backend server and the API Backend server
// -----------------------------------------------
const webStart = async (WebSrv) => {
    // Create the server
    const websrv = await WebSrv.init(host, port);

    // Start the server if plugins are loaded successfully
    await websrv.start();

    console.log('Web Server running on %s', websrv.info.uri);
};

const apiStart = async (ApiSrv) => {
    // Create the server
    const apisrv = await ApiSrv.init(host, port + 1);

    // Start the server if plugins are loaded successfully
    await apisrv.start();

    console.log('API Server running on %s', apisrv.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

console.log('Server...')

// This lets us pass in an 'app' argument when launching this module
// eg. require('./server')(app);
module.exports = function (app) {
    if (app === "api") {
        // Backend API server
        console.log('Starting app %s', app);
        const ApiSrv = require ('./apiback/apisrv');
        apiStart(ApiSrv);
    } else if (app === "web") {
        // Web server
        console.log('Starting app %s', app);
        const WebSrv = require ('./webback/websrv');
        webStart(WebSrv);
    } else {
        console.log('Unknown app %s', app);
        process.exit(1);    
    }
};



