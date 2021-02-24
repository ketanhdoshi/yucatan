import express from "express";
import path from "path";

import srvRender from '../built/serverbundle.js';

// Server var
const app = express();

// View engine setup
app.set("views", path.join(__dirname, "templates"));
console.log(path.join(__dirname, "templates"));
app.set("view engine", "ejs");

// Middleware - this serves the bundles built by Webpack from ../built
// eg. styles.css, clientbundle.js
console.log(__dirname);
app.use(express.static(path.join(__dirname, '..')));
console.log(path.join(__dirname, '..'));

app.get('/hi', function(req, res, next) {
    res.render('index.ejs')
})

/* app.get('/', (req, res) => {
    console.log('req received');
    return res.status(200).send(<div><h5>Hello View</h5></div>)
}); */

hmr();

// For all routes except those starting with '/built' as those are handled
// either by the HMR middlewares or express.static 
app.get(/^\/(?!built).*/, srvRender);

const port = 3010;

app.listen(port, function listenHandler() {
    console.info(`Running on ${port}`)
});

function hmr () {
    var webpack = require('webpack');
    var webpackConfig = require('../webpack.config.js');
    var compiler = webpack(webpackConfig);
    
    // Tell express to use the webpack-dev-middleware and use the webpack.config.js
    // configuration file as a base.
    app.use(require("webpack-dev-middleware")(compiler, {
        publicPath: webpackConfig[0].output.publicPath,
        serverSideRender: true // enable serverSideRender
    }));

    app.use(require("webpack-hot-middleware")(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 2000
    }));
}