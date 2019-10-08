const config = {
  sourceType: 'unambiguous',
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      '@babel/plugin-proposal-object-rest-spread',
      {
        loose: true,
      },
    ],
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== 'production' || process.env.STORYBOOK_BUILD === 'production') {
  config.plugins.push([
    'babel-plugin-module-resolver',
    {
      root: ['./'],
      alias: {
        '@kuveytturk/boa-base': './packages/base/src',
        '@kuveytturk/boa-components': './packages/components/src',
        '@kuveytturk/boa-utils': './packages/utils/src',
        '@kuveytturk/boa-test': './test',
      },
    },
  ]);
}

module.exports = config;
