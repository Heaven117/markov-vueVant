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
      // stylus: {
      //   'resolve url': true,
      //   'import': [
      //     './src/theme'
      //   ]
      // },
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 37.5, //根据设计稿宽度除以10进行设置，这边假设设计稿为375，即rootValue设为37.5；
            propList: ['*']  //设置需要转换的属性，这边*为所有都进行转换
          })
        ]
      }
    }
  },
  pluginOptions: {

  }
}
