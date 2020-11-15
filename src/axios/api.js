//接口api
import fetch from '@/axios/http.js'

export function setCode() {
  return fetch({
    url: "/code",
    method: "get",
  });
}
// 登录

export function login(data) {
  return fetch({
    url: "/system/auth/login",
    method: "post",
    data,
  });
}

