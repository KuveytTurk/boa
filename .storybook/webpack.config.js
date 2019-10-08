const webpack = require('webpack');
const { resolve } = require('path');

module.exports = {
  resolve: {
    modules: [
      resolve(__dirname, 'packages', 'base', 'src'),
      resolve(__dirname, 'packages', 'components', 'src'),
      resolve(__dirname, 'packages', 'utils', 'src'),
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components|perfect-scrollbar)/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [require('react-hot-loader/babel')],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
      {
        test: /\.(eot|svg|jpe?g|png|gif|ttf|woff2?)$/,
        use: 'url-loader',
      },
    ],
  },
};
