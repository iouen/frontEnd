'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
   /**
   * 开发工具 (Devtool)
   * @see https://webpack.js.org/configuration/devtool/
   * @description 此选项控制是否生成，以及如何生成 Source Map
   * cheap-module-eval-source-map is faster for development
   */
  devtool: config.dev.devtool,

  /**
   * 开发服务器 (DevServer)
   * @see 也可以使用Express https://webpack.js.org/configuration/dev-server/
   * these devServer options should be customized in /config/index.js
   */
  devServer: {
    clientLogLevel: 'warning',
    // 当使用HTML5 History API，任意的 404 响应可以提供为 index.html 页面
    historyApiFallback: true,
    hot: true,
    // 启用gzip压缩
    compress: true,
    // 构建消息将会出现在浏览器控制台
    inline: true,
    // 指定使用一个 host
    host: HOST || config.dev.host,
    // 指定要监听请求的端口号
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    //遮罩层提示错误
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    // 与监视文件相关的控制选项
    watchOptions: {
      poll: config.dev.poll,
    }
  },

  /**
   * 插件 (Plugins)
   * @see https://webpack.js.org/configuration/plugins/
   */

  plugins: [
    // 用于编译时可以配置的全局常量
    // https://webpack.js.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),

    // 用于模块热替换，适用于开发环境
    // https://webpack.js.org/guides/hmr-react/
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    //https://github.com/ampedandwired/html-webpack-plugin
    //用于简化 HTML 文件（index.html）的创建，提供访问 bundle 的服务。
    //https://webpack.js.org/plugins/html-webpack-plugin/
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      favicon: resolve('favicon.ico'),
      title: 'vue-element-admin'
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      // 第三方插件，优化提示效果
      // https://github.com/geowarin/friendly-errors-webpack-plugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
