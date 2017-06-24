'use strict';

const Path = require('path');
import srvRender from '../built/serverbundle.js';

// -----------------------------------------------
// This is our Web UI server.
// -----------------------------------------------
//var websrv = null;

const testHandler = function (request, reply) {

    reply.view('test', {
        html: '<h2>Hello Chintu</h2>',
        message: 'My Superb Message!'
    });
};

module.exports.init = (server, port) => {

    const websrv = server.connection({
        host: 'localhost',
        port: port,
        labels: 'websrv'
    });

    // -----------------------------------------------
    // Load inert plugin for static content
    // -----------------------------------------------
    websrv.register(require('inert'), (err) => {

        if (err) {
            throw err;
        }

        // Route for a single test URL using a static HTML file
        websrv.route({
            method: 'GET',
            path: '/hello',
            handler: function (request, reply) {
                reply.file('./webback/templates/hello.html');
            }
        });

        // Serve static content at the built URL from the built directory
        websrv.route({
            method: 'GET',
            // URL for serving content is '/built/*'
            path: '/built/{param}',
            handler: {
                directory: {
                    path: Path.join(__dirname, '../built')
                }
            }
        });
    });
    
    // -----------------------------------------------
    // Load vision plugin for rendering templates
    // -----------------------------------------------
    websrv.register(require('vision'), (err) => {

        if (err) {
            throw err;
        }

        websrv.log('info', 'Vision loaded');

        // Use the ejs template engine for all '*.ejs' files
        websrv.views({
            engines: { ejs: require('ejs') },
            relativeTo: __dirname,
            path: 'templates'
        });
        
        // Render a single test URL path using a test template
        websrv.route({ method: 'GET', path: '/test', handler: testHandler });

        // Render all URLs with React
        websrv.route({ method: 'GET', path: '/{param*}', handler: srvRender });
    });
}