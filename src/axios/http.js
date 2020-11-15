//axios封装
import axios from 'axios';
import { Message } from 'element-ui';
const service = axios.create({
    timeout: 30000, // 请求超时时间
    baseURL: "http://tp8che.natappfree.cc",
    headers:{
        // 'Authorization': 'Bearer'+"xnjabj"
    }
});
//添加请求拦截器
service.interceptors.request.use(request => {
    console.log(request)
    return request
}, error => {
    //请求错误时做些事
    return Promise.reject(error)
})

//拦截返回的数据res,通过返回值直接获取到服务器的数据
service.interceptors.response.use(response => {
    const res = response.data;
    const _CODE = res.code;
    if (_CODE === 401 || _CODE === 500 || _CODE === 400 || _CODE === 401) {
        Message.error(res.message);
    }
    return Promise.resolve(res);
}, error => {
    return Promise.reject(error);
})
export default service;