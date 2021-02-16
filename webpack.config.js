const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');

const config = {
    name: 'client',
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [
        // !!!!!!! 'webpack-hot-middleware/client',
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
                 // presets: [ 'react-hmre' ]
                 presets: ["@babel/preset-env"]
            }
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
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
        // !!!!!!! new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })
  ],
  resolve: {
        modules: [__dirname, "node_modules"]
  }
};

const serverConfig = {
  name: 'server',
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  entry: [
    'webback/srvRender.js',
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
            loader: 'css-loader',
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