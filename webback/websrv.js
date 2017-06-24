'use strict';

// -----------------------------------------------
// This is our Web UI server.
// -----------------------------------------------
var websrv = null;

const rootHandler = function (request, reply) {

    reply.view('index', {
        html: '<h2>Hello Chintu</h2>',
        message: 'My Superb Message!'
    });
};

module.exports.init = (server, port) => {

    websrv = server.connection({
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

        websrv.route({
            method: 'GET',
            path: '/hello',
            handler: function (request, reply) {
                reply.file('./webback/templates/hello.html');
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

        websrv.route({ method: 'GET', path: '/', handler: rootHandler });
    });
}