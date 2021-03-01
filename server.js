'use strict';

// -----------------------------------------------
// This is our main file and the entry point for our server application.
// It creates the two separate backends, one for the Web UI and another
// for the API, and listens on two separate ports for incoming connections
//
// NB: We now use an Express Web UI server, rather than this one from HAPI 
// as it doesn't support Hot Module Reload.
// -----------------------------------------------

// -----------------------------------------------
// Start the Web Backend server
// -----------------------------------------------
const webStart = async (WebSrv) => {
    // Create the server
    const websrv = await WebSrv.init(host, port);

    // Start the server if plugins are loaded successfully
    await websrv.start();

    console.log('Web Server running on %s', websrv.info.uri);
};

// -----------------------------------------------
// Start the API Backend server
// -----------------------------------------------
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

// -----------------------------------------------
// This lets us pass in an 'app' argument when launching this module
// eg. require('./server')(app);
// -----------------------------------------------
const launch = function (app) {
    if (app === "api") {
        // Backend API server
        console.log('Starting app %s', app);
        const ApiSrv = require ('./apiback/apisrv');
        apiStart(ApiSrv);
    } else if (app === "web") {
        // Web server
        console.log('Starting app %s', app);
        const WebSrv = require ('./old/websrv');
        webStart(WebSrv);
    } else {
        console.log('Unknown app %s', app);
        process.exit(1);    
    }
};

// -----------------------------------------------
// Start of main program
// -----------------------------------------------

// Skip the first two arguments (ie. "node" and "serverStart.js")
// Pass the 'app' argument when starting the server module
var args = process.argv.slice(2);
var app = args[0];

console.log('Server...')

// Hostname and port
const host = 'localhost';
const port = 3010;

// Run the server
launch(app)

module.exports = launch


