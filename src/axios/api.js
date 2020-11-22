//接口api
import fetch from '@/axios/http.js'
const URL = "http://49.234.22.146:8077";
const URLIMG = "http://49.234.22.146:8070"
// 登录
export function login(data) {
  return fetch({
    url: URL + "/user/login",
    method: "post",
    data,
  });
}

//获取列表
export function getList(data) {
  return fetch({
    url: URL + "/Commodity/CommodityList",
    method: "get",
    params: data
  });
}

//获取详情
export function getDetailData(goodsId) {
  return fetch({
    url: URL + `/Commodity/CommodityId?goodsId=${goodsId}`,
    method: "get"
  });
}
//编辑
export function updataData(data) {
  return fetch({
    url: URL + '/Commodity/CommodityUpdate',
    method: "post",
    data
  });
}
//添加
export function addData(data) {
  return fetch({
    url: URL + '/Commodity/CommodityAdd',
    method: "post",
    data
  });
}
//删除
export function delData(goodsId) {
  return fetch({
    url: URL + `/Commodity/CommodityDelete?goodsId=${goodsId}`,
    method: "get"
  });
}
//上传图片
export function updataImg(data) {
  return fetch({
    url: URLIMG + '/upload/tengxun',
    method: "post",
    data,
    headers:{
      "Content-Type": "multipart/form-data"
    }
  });
}
//删除图片
export function delImg(key) {
  return fetch({
    url: URLIMG + `/upload/deleteFile?key=${key}`,
    method: "get"
  });
}
//获取账号列表
export function getUserInfo(data) {
  return fetch({
    url: URL + "/user/findUserInfo",
    method: "post",
    data
  });
}

//账号详情
export function detailUser(accountId) {
  return fetch({
    url: URL + `/user/findUserInfoId?accountId=${accountId}`,
    method: "get"
  });
}

//添加账号
export function addUser(data) {
  return fetch({
    url: URL + "/user/addUserInfo",
    method: "post",
    data
  });
}

//编辑账号
export function editUser(data) {
  return fetch({
    url: URL + "/user/updateUserInfo",
    method: "post",
    data
  });
}


//删除账号
export function delUser(accountId) {
  return fetch({
    url: URL + `/user/deleteUserInfo?accountId=${accountId}`,
    method: "get"
  });
}

//获取商品类型
export function getTypelist() {
  return fetch({
    url: URL + '/status/statusLists',
    method: "get"
  });
}
//添加商品类型
export function addGoodsType(data) {
  return fetch({
    url: URL + '/status/statusAdd',
    method: "post",
    data
  });
}
//删除商品类型
export function delGoodsType(goodsType) {
  return fetch({
    url: URL + `/status/statusDelete?goodType=${goodsType}`,
    method: "get"
  });
}