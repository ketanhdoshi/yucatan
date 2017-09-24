const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const config = {
    name: 'client',
    devtool: 'inline-source-map',
    entry: [
        'webpack-hot-middleware/client',
        'client/client.js'
    ],
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
                presets: [ 'react-hmre' ]
            }
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader",
            })
        },
        {
            test: /datepicker\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: 'css-loader',
                    options: { 
                        importLoaders: 1 
                    },
                }]
            })
        },
        {
            test: /\.scss$/,
            exclude: /datepicker\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: '[name]__[local]___[hash:base64:5]'
                    },
                }]
            })
        }
        ]
    },
  plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: 'styles.css'
        })
  ],
  resolve: {
        modules: [__dirname, "node_modules"]
  }
};

const serverConfig = {
  name: 'server',
  target: 'node',
  externals: [nodeExternals()],
  entry: [
    'webback/srvRender.js',
  ],
  output: {
    path: path.join(__dirname, 'built/'),
    filename: 'serverbundle.js',
    publicPath: 'built/',
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
                ["es2015", {"modules": false}],
                "react"
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
        loader: 'css-loader/locals?importLoaders=1'
      },

     {
        test: /\.scss$/,
        loader: 'css-loader/locals?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      }
    ]
  },
  resolve: {
    modules: [__dirname, "node_modules"]
  }
};

module.exports = [config, serverConfig];