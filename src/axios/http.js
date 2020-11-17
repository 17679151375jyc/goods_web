//axios封装
import axios from 'axios';
import { Message } from 'element-ui';
import Qs from "qs";
const service = axios.create({
    timeout: 30000, // 请求超时时间
    // baseURL: "/api",
    baseURL: "http://979nvb.natappfree.cc",
    headers:{
        "Content-Type": "application/x-www-form-urlencoded",
        // "Connection": "keep-alive",
        // "Content-Type": 'application/json',
        
        // 'Cache-Control': 'no-cache', 'Pragma': 'no-cache',
        
    }
});
//添加请求拦截器
service.interceptors.request.use(request => {
    if(request.headers["Content-Type"] === "application/x-www-form-urlencoded"){
        request.data = Qs.stringify(request.data)
    }
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