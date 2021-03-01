const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Install Webpack Dashboard plugin just for fun, but there is no way to
// interact with the UI with the mouse on Windows. I can scroll in the main log
// pane using Up/Down Arrow keys, but cannot scroll in any of the other panes.
const DashboardPlugin = require("webpack-dashboard/plugin");
const nodeExternals = require('webpack-node-externals');

const config = {
    name: 'client',
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=4000&overlay=false',
        'client/client.js'
    ],
    watchOptions: { 
      poll: true,
      ignored: /node_modules/,
    },
    output: {
        path: path.join(__dirname, 'built/'),
        filename: 'clientbundle.js',
        publicPath: '/built/'
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                 // presets: [ 'react-hmre' ]
                 presets: ["@babel/preset-env"]
            }
        },
        {
            // I don't think the 'test' filter matches anything, so remove it
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-xx-loader']
        },
        {
            test: /datepicker\.scss$/,
           use: [
              MiniCssExtractPlugin.loader, 
              {
                loader: 'css-loader',
                options: { 
                    importLoaders: 1 
                },
              }
            ]
        },
        {
            test: /\.scss$/,
            exclude: /datepicker\.scss$/,
            use: [
              MiniCssExtractPlugin.loader, 
              {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                    modules: {
                      localIdentName: '[name]__[local]___[hash:base64:5]'
                  }
                }
              }
            ]
        }
        ]
    },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new DashboardPlugin(),
  ],
  resolve: {
    modules: [__dirname, "node_modules"]
  }
};

const serverConfig = {
  name: 'server',
  mode: 'development',
  target: 'node', // ignore built-in modules like path, fs, etc.
  devtool: 'inline-source-map',
  externals: [nodeExternals()], // ignore all modules in node_modules folder
  entry: [
    'webback/expressRender.js',
  ],
  output: {
    path: path.join(__dirname, 'built/'),
    filename: 'serverbundle.js',
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
        exclude: /scss\\.*\.css$/,
        loader: 'null'
      },
      {
        test: /scss\\.*\.css$/,
        use: [
          {
            // I don't think the 'test' filter matches anything, so remove it
            loader: 'shit-loader',
            options: {
                importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
                modules: {
                  // Needed so the CSS Modules style class names are included in the 
                  // server-rendered HTML and can match the style class names on the client
                  exportOnlyLocals: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [__dirname, "node_modules"]
  }
};

module.exports = [config, serverConfig];