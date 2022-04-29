import axios from 'axios'

const instance = axios.create({
    // baseURL: process.env.NODE_ENV=='production'?'':'',
    // timeout: 5000,
    // headers: { 'X-Custom-Header': 'foobar' }
});



// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // 在每一次发送请求的时候，通过请求头把token信息传递给服务器
    const token = window.localStorage.getItem('token');
    config.headers['Authorization'] = token
    return config;
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    Promise.reject(error);
});



export default instance;
