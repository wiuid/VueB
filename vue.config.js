const path = require('path') // 引入path模块

function resolve (dir) {
  return path.join(__dirname, dir)
}
// path.join(__dirname)设置绝对路径

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      // 路径别名
      .set('styles', resolve('src/assets/styles'))
      .set('img', resolve('src/assets/images'))
      .set('icon', resolve('src/assets/icon'))

  },
  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: false
    },
    host: '127.0.0.1',
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: true, // 配置后自动启动浏览器
    hotOnly: true, // 热更新
    // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
    proxy: { // 配置多个跨域
      '/api': {
        target: 'http://127.0.0.1:81',
        changeOrigin: true,
        ws: true, // websocket支持
        secure: false,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
