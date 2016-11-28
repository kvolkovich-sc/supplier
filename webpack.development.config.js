const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/client/demo/index.react.js',
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: `bundle.js`,
    //sourceMapFilename: "bundle.js.map",
    //devtoolLineToLine: true,
    library: 'supplier',
    libraryTarget: 'umd'
  },

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
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.HOST': JSON.stringify(process.env.HOST ? process.env.HOST : 'localhost'),
      'process.env.PORT': JSON.stringify(process.env.PORT ? process.env.PORT : 3001)
    })
  ],

  resolve: {
    modules: ['node_modules'],
    extensions: ['.json', '.jsx', '.js']
  },

  resolveLoader: {
    modules: ['node_modules'],
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
        test: /.js$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src')
        ],
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
