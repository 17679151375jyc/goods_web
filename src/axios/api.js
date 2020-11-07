//接口api
import fetch from '@/axios/http.js'
// 登录
export function login(data) {
  return fetch({
    url: "/st/res/user/login",
    method: "post",
    data,
  });
}

