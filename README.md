# cube-test

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



## 技术栈

- Vue2+VueRouter

- vant-UI

- devserver（跨域）

- amfe-flexible和postcss-pxtorem（移动端适配）

  

  

### 移动端适配

amfe-flexible是配置可伸缩布局方案，主要是将1rem设为viewWidth/10

postcss-pxtorem是postcss的插件，用于将像素单元生成rem单位

html的字体大小跟随设备宽度进行改变，body跟随设备的dpr进行改变，这是amfe-flexible的实现，即说明配置成功。

**使用**

```js
//main.js导入
import 'amfe-flexible';
```

配置postcss-pxtorem，可在vue.config.js、.postcssrc.js、postcss.config.js其中之一配置，权重从左到右降低，没有则新建文件，只需要设置**其中一个**即可：

```js
//vue.config.js
module.exports = {
    //...其他配置
    css: {
        loaderOptions: {
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
}
//.postcssrc.js、postcss.config.js
module.exports = {
    "plugins": {
        'postcss-pxtorem': {
            rootValue: 37.5,
            propList: ['*']
        }
    }
}
```













































