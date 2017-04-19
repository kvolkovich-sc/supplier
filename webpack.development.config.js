const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');

let entry;
let outputExtention;

if (process.env.DEV_TYPE == 'local') {
  entry = './src/client/index_dev.js';
  outputExtention = {};
} else {
  entry = './src/client/index.js';
  outputExtention = { library: 'supplier', libraryTarget: 'umd', umdNamedDefine: true };
}

module.exports = {
  entry: entry,
  output: _.merge({
    path: path.resolve(__dirname, './src/server/static'),
    publicPath: '/static',
    filename: 'bundle.js'
  }, outputExtention),

  //exclude empty dependencies, require for Joi
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },

  devtool: 'eval-source-map',

  plugins: [
    new webpack.ContextReplacementPlugin(
      new RegExp('\\' + path.sep + 'node_modules\\' + path.sep + 'moment\\' + path.sep + 'locale'),
      /en|de/
    ),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  resolve: {
    modules: [process.env.NODE_PATH, 'node_modules'],
    extensions: ['.json', '.jsx', '.js']
  },

  resolveLoader: {
    modules: [process.env.NODE_PATH, 'node_modules'],
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: [process.env.NODE_PATH],
        options: {
          presets: [
            ['es2015', {modules: false}],
            'react',
            'stage-0'
          ],
          plugins: ['transform-decorators-legacy']
        }
      }
    ]
  }
};
