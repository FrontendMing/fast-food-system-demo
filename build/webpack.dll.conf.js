const path = require('path')
const webpack = require('webpack')
const package = require('../package.json')
const AssetsPlugin = require('assets-webpack-plugin')
module.exports = {
  entry: {
    // 填写需要提取出来的依赖包
    vendor: Object.keys(package.dependencies).filter(item => {
      return item.indexOf('normalize') < 0 && item != 'vue'
    })
  },
  output: {
    path: path.join(__dirname, '../static'),
    filename: 'dll.[name]_[hash:6].js',
    library: '[name]_[hash:6]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../', '[name]-manifest.json'),
      name: '[name]_[hash:6]'
    }),
    new AssetsPlugin({
      filename: 'bundle-config.json',
      path: './'
    })
  ]
}