module.exports = {
  devServer: {
    host: 'localhost',
    port: 9999,
    https: false,
    open: true,
    hotOnly: true
  },
  outputDir: './dist',
  assetsDir: './assets/',
  publicPath: './',
  indexPath: './index.html',
  transpileDependencies: ['vuetify']
}
