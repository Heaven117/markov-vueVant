module.exports = {
  //开发模式反向代理配置，生产模式请使用Nginx部署并配置反向代理
  devServer: {
    port: 3000,
    proxy: {
      '/map': {
        target: 'http://restapi.amap.com',
        ws: true,
        pathRewrite: {
          '^/map': '/'
        }
      },
      '/api': {
        target: 'http://localhost:8101',
        changeOrigin: true,
        pathRewrite: {
          '^/api/blade-volunteer-biz': '/'
        }
      },
      // 百度地图 不代理跨域
      '/place': {
        target: 'https://api.map.baidu.com',
        changeOrigin: true
      },
      '/wxjssdk': {
        target: 'http://localhost:8787',
        changeOrigin: true
      },
    },
    https: true,
    // host: 'www.yzlhaha.top',
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
  }
}
