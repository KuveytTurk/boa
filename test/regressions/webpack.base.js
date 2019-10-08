/* eslint-disable global-require */
import webpack from 'webpack';
import yargs from 'yargs';

export const options = yargs.alias('p', 'optimizeMinimize').alias('d', 'debug').argv;

const baseConfig = {
  entry: undefined,
  output: undefined,
  externals: undefined,
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
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
  optimization: {
    minimize: options.optimizeMinimize === true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};

if (options.optimizeMinimize) {
  baseConfig.devtool = 'source-map';
}

export default baseConfig;
