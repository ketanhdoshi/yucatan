'use strict';

const Path = require('path');
const Webpack = require('webpack');
const Config = require('../webpack.config.js');

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

const hmr = (server, host, port) => {
    const compiler = Webpack(Config);

    const devMiddleware = require('webpack-dev-middleware')(compiler, {
        host,
        port,
        historyApiFallback: true,
        publicPath: Config[0].output.publicPath
    });

    const hotMiddleware = require('webpack-hot-middleware')(compiler, {
        log: () => {}
    });

    server.ext('onRequest', (request, reply) => {

        devMiddleware(request.raw.req, request.raw.res, (err) => {

            if (err) {
                return reply(err);
            }

            reply.continue();
        });
    });

    server.ext('onRequest', (request, reply) => {

      hotMiddleware(request.raw.req, request.raw.res, (err) => {

          if (err) {
              return reply(err);
          }

          reply.continue();
      });
    });
    
}

module.exports.init = (server, port) => {

    const websrv = server.connection({
        host: 'localhost',
        port: port,
        labels: 'websrv'
    });

    hmr (server, 'localhost', port);

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