const fs = require('fs');

const packageJson = fs.readFileSync('./package.json');
const version = JSON.parse(packageJson).version || 0;
const webpack = require('webpack');
const { BugsnagSourceMapUploaderPlugin } = require('webpack-bugsnag-plugins');

module.exports = {
  outputDir: 'docs/',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/tsm-editor/'
    : '/',
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/_variables.scss";',
      },
    },
  },
  configureWebpack: () => {
    const plugins = [
      new webpack.DefinePlugin({
        'process.env': {
          PACKAGE_VERSION: `"${version}"`,
        },
      }),
    ];

    if (process.env.NODE_ENV === 'production') {
      plugins.push(new BugsnagSourceMapUploaderPlugin({
        apiKey: '1a5d9bde039258ef72cf342d7057f654',
        appVersion: `${version}`,
      }));

      return { devtool: 'source-maps', plugins };
    }

    return { plugins };
  },
};
