import axios from "axios";
import store from "@/store";
const request = axios.create({
  //配置选项
});

//请求拦截器
request.interceptors.request.use(
  function (config) {
    const { userInfo } = store.state;
    if (userInfo?.access_token) {
      config.headers.common["Authorization"] = userInfo.access_token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

//响应拦截器
export default request;
