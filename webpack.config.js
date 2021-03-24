const path = require('path');
const webpack = require('webpack');
// Used to extract all CSS to a separate (styles.css) file which is referenced from the
// placeholder HTML file ie. <link rel="stylesheet" href="/built/styles.css" />
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// React Fast Refresh plugin for HMR for React Components
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// Install Webpack Dashboard plugin just for fun, but there is no way to
// interact with the UI with the mouse on Windows. I can scroll in the main log
// pane using Up/Down Arrow keys, but cannot scroll in any of the other panes.
const DashboardPlugin = require("webpack-dashboard/plugin");
const nodeExternals = require('webpack-node-externals');

// Development or Production settings - should be taken from env variable
const isDev = true;

// -----------------------------------------------------------------
// Webpack configuration for the client-side bundle
// -----------------------------------------------------------------
const config = {
    name: 'client',
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [
        // HMR Client Runtime that is injected into the client bundle running in the browser
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=4000&overlay=false',
        // Entry point for the client rendering code
        'client/client.js'
    ],
    watchOptions: {
      // webpack-dev-middleware watches the file system for changes to source code files
      // so it can rebuild them for HMR. In Docker containers, the file system is not able
      // to notify the dev-middleware when this happens. So we have to poll the file system.
      poll: true,
      ignored: /node_modules/,
    },
    output: {
      // Output location and file name of the client bundle
      path: path.join(__dirname, 'built/'),
      filename: 'clientbundle.js',
      // URL used by the browser to fetch the client bundle ie. http://localhost:8080/built/clientbundle.js
      publicPath: '/built/'
    },
    module: {
        // Rules that define how files of different types will be processed by Webpack loaders
        rules: [
        {
            // All Javascript files (except third party libraries in node_modules) are transpiled
            // by babel-loader. It uses the 'env' preset, which provides compatibiity with all browsers
            // by transpiling our code to an older version of Javascript.
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                 presets: ["@babel/preset-env"],
                 plugins: [
                    require.resolve('react-refresh/babel'),
                ]
            }
        },
        {
            // Plain CSS files are processed by css-loader first.
            // Then, Inject styles inline with style-loader during development
            //       Extract separate styles.css file during production
            test: /\.css$/,
            use: [
              isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader'
            ]
        },
        {
            test: /datepicker\.scss$/,
           use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'shit-css-loader',
                options: { 
                    importLoaders: 1 
                },
              }
            ]
        },
        {
            // Rule applies to all SCSS files (except those excluded)
            test: /\.scss$/,
            exclude: /datepicker\.scss$/,
            use: [
              // Inject styles inline with style-loader during development
              // Extract separate styles.css file during production
              isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                    // Produce code for CSS Modules
                    modules: {
                      // Format of generated class names
                      localIdentName: '[name]__[local]___[hash:base64:5]'
                  }
                }
              },
              "sass-loader"
            ]
        },
        {
          // Images are inserted inline into the HTML
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/inline',
        },
        {
          // Fonts are inserted inline into the CSS
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/inline',
        },
        ]
    },
  plugins: [
    // Plugin to enable HMR
    new webpack.HotModuleReplacementPlugin(),
    // React Fast Refresh plugin (handles HMR for React components)
    new ReactRefreshWebpackPlugin({
      overlay: {
        // Integration with webpack-hot-middleware
        sockIntegration: 'whm',
      },
    }),
    // Extracts the CSS from all the individual CSS files and combines it into a separate
    // 'styles.css' file in the output directory. This file is referenced from the 
    // index.ejs HTML template so it gets fetched and loaded by the browser.
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new DashboardPlugin(),
  ],
  resolve: {
    modules: [__dirname, "node_modules"]
  }
};

// -----------------------------------------------------------------
// Webpack configuration for the server-side bundle
// -----------------------------------------------------------------
const serverConfig = {
  name: 'server',
  mode: 'development',
  target: 'node', // ignore built-in modules like path, fs, etc.
  devtool: 'inline-source-map',
  externals: [nodeExternals()], // ignore all modules in node_modules folder
  entry: [
    // Entry point for the server rendering code
    'webback/expressRender.js',
  ],
  output: {
    // Output location and file name of the server bundle
    path: path.join(__dirname, 'built/'),
    filename: 'serverbundle.js',
    // URL used by node.js to import our application code from the server bundle 
    // for rendering on the server ie. http://localhost:8080/built/serverbundle.js
    publicPath: '/built/',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
            presets: [
                ["@babel/preset-env", {"modules": false}],
                "@babel/preset-react"
            ]
        }
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
                modules: {
                  // 'exportOnlyLocals' is needed so the CSS Modules style class names are 
                  // included in the server-rendered HTML and can match the style class names 
                  // on the client. Without this flag, the server-render sends plain HTML without
                  // any associated classnames from the CSS Modeules .
                  exportOnlyLocals: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            }
          },
          "sass-loader"
        ]
      },
      {
        // Images are inserted inline into the HTML
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/inline',
      },
      {
        // Fonts are inserted inline into the CSS
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/inline',
      },
    ]
  },
  resolve: {
    modules: [__dirname, "node_modules"]
  }
};

module.exports = [config, serverConfig];