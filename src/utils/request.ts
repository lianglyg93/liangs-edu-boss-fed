import axios from "axios";
import store from "@/store";
import { Message } from "element-ui";
import router from "@/router";
import qs from "qs";
const request = axios.create({
  //配置选项
});

function redirectLogin() {
  router.push({
    name: "login",
    query: {
      redirectUrl: router.currentRoute.fullPath,
    },
  });
}
function refreshToken() {
  return axios.create()({
    method: "POST",
    url: "/front/user/refresh_token",
    data: qs.stringify({
      refreshtoken: store.state.userInfo.refresh_token,
    }),
  });
}
//请求拦截器
request.interceptors.request.use(
  function (config) {
    const { userInfo } = store.state;
    if (userInfo?.access_token) {
      config.headers.Authorization = userInfo.access_token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
let isRfreshing = false;
let requests: any[] = [];
//响应拦截器
request.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  async function (error) {
    // Do something with response error
    if (error.response) {
      const { status } = error.request;
      if (status === 400) {
        Message.error("请求参数错误");
      } else if (status === 401) {
        //token无效（没有提供token，token无效，token过期）
        //如果有refresh_token则尝试使用refresh_token获取新的access_token
        //成功了，把本次失败的请求重新发出去
        //失败了，跳转登录页重新登录获取新的token
        //如果没有refresh_token则直接跳转登录页
        if (!store.state.userInfo) {
          redirectLogin();
          return Promise.reject(error);
        }
        // 刷新 token
        if (!isRfreshing) {
          isRfreshing = true;
          return refreshToken()
            .then((res) => {
              if (!res.data.success) {
                throw new Error("刷新 Token 失败");
              }
              store.commit("setUser", res.data.content);
              requests.forEach((cb) => cb());
              requests = [];
              return request(error.config);
            })
            .catch((err) => {
              store.commit("setUser", null);
              redirectLogin();
              return Promise.reject(err);
            })
            .finally(() => {
              isRfreshing = false;
            });
        }
        return new Promise((resolve) => {
          requests.push(() => {
            resolve(request(error.config));
          });
        });
      } else if (status === 403) {
        Message.error("没有权限，请联系管理员");
      } else if (status === 404) {
        Message.error("访问资源不存在");
      } else if (status >= 500) {
        Message.error("服务器错误，请联系管理员");
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js

      Message.error("请求超时，请刷新重试");
    } else {
      // Something happened in setting up the request that triggered an Error
      Message.error(`请求失败：${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default request;
