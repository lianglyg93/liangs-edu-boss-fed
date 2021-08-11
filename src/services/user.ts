import request from "@/utils/request";
import qs from "qs";
// import store from "@/store";

interface User {
  phone: string;
  password: string;
}
// 登录
export const loginIn = (data: User) => {
  return request({
    method: "POST",
    // headers: {
    //   "content-type": "application/x-www-form-urlencoded",
    // },
    url: "/front/user/login",
    data: qs.stringify(data),
  });
};
// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: "GET",
    url: "/front/user/getInfo",
    // headers: {
    //   Authorization: store.state.userInfo.access_token,
    // },
  });
};

//分页查询用户信息
export const getUserPages = (data: User) => {
  return request({
    method: "POST",
    url: "/boss/user/getUserPages",
    data,
  });
};
