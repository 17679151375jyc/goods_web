//接口api
import fetch from '@/axios/http.js'
// 登录

export function login(data) {
  return fetch({
    url: "/user/login",
    method: "post",
    data,
  });
}


export function getList(data) {
  return fetch({
    url: "/Commodity/CommodityList",
    method: "get",
    params: data
  });
}
