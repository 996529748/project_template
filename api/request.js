/* jshint esversion: 6 */
import axios from "axios";

axios.defaults.withCredentials = true; //让ajax携带cookie
// 创建axios 实例
const service = axios.create({
  // baseURL: "xxxx", // api的base_url
});

// request 拦截器
service.interceptors.request.use(
  (config) =>
    // config.headers['Accept'] = 'multipart/form-data';
    // config.headers['Content-Type'] = 'multipart/form-data';
    config,
  (error) =>
    //  这里处理一些请求出错的情况
    Promise.reject(error) // 返回一个以给定参数值解析后的Promise对象
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) =>
    // 这里处理一些response 出错时的逻辑
    // 返回接口返回的错误信息
    Promise.reject(error) // 返回一个以给定参数值解析后的Promise对象
);

export default service;
