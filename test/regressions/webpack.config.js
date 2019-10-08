/* eslint no-var: 0, vars-on-top: 0 */
require('@babel/register');
const path = require('path');
const webpackBaseConfig = require('./webpack.base').default;

module.exports = Object.assign({}, webpackBaseConfig, {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, '../../tmp'),
    filename: 'tests.js',
  },
  module: Object.assign({}, webpackBaseConfig.module, {
    rules: webpackBaseConfig.module.rules.concat([
      {
        test: /\.(jpg|gif|png)$/,
        loader: 'url-loader',
      },
    ]),
  }),
});
