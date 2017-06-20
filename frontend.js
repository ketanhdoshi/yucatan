'use strict';

// -----------------------------------------------
// This is our frontend web UI server.
// -----------------------------------------------
var frontend = null;

const rootHandler = function (request, reply) {

    reply.view('index', {
        html: '<h2>Hello Chintu</h2>',
        message: 'My Superb Message!'
    });
};

module.exports.init = (server, port) => {

    frontend = server.connection({
        host: 'localhost',
        port: port,
        labels: 'frontend'
    });

    // -----------------------------------------------
    // Load inert plugin for static content
    // -----------------------------------------------
    frontend.register(require('inert'), (err) => {

        if (err) {
            throw err;
        }

        frontend.route({
            method: 'GET',
            path: '/hello',
            handler: function (request, reply) {
                reply.file('./templates/hello.html');
            }
        });
    });
    
    // -----------------------------------------------
    // Load vision plugin for rendering templates
    // -----------------------------------------------
    frontend.register(require('vision'), (err) => {

        if (err) {
            throw err;
        }

        frontend.log('info', 'Vision loaded');

        // Use the ejs template engine for all '*.ejs' files
        frontend.views({
            engines: { ejs: require('ejs') },
            relativeTo: __dirname,
            path: 'templates'
        });

        frontend.route({ method: 'GET', path: '/', handler: rootHandler });
    });
}