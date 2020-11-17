//接口api
import fetch from '@/axios/http.js'
// 登录

export function login(data) {
  return fetch({
    url: "/login",
    method: "post",
    data,
  });
}

