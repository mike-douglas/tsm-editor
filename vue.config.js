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
};
