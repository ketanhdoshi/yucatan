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
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [ 'react-hmre' ]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /datepicker\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css-loader?importLoaders=1')
      },
      {
        test: /\.scss$/,
        exclude: /datepicker\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
      }
    ]
  },
  plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin('styles.css')
  ],
  resolve: {
    root: __dirname
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
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
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
    root: __dirname
  }
};

module.exports = [config, serverConfig];