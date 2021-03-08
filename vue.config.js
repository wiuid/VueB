module.exports = {
  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: false
    },
    host: '0.0.0.0',
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: false, // 配置后自动启动浏览器
    hotOnly: true, // 热更新
    // proxy: 'http://127.0.0.1:81'   // 配置跨域处理,只有一个代理
    proxy: { // 配置多个跨域
      '/api': {
        target: process.env.VUE_APP_API_BASE_URL,
        changeOrigin: true, // 是否跨域
        secure: false, // 如果是https接口，需要配置这个参数
        ws: true, // 如果要代理 websockets，配置这个参数
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
