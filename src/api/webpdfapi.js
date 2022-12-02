//https://www.npmjs.com/package/class_http_serve
import HttpRequest from "class_http_serve";

const domain = "https://www.baidu.com/";
const http = new HttpRequest();

// 获取用户信息
export const getUserInfo = (config = {}) =>
  http.request({
    url: `${domain}/getUserInfo`,
    config,
  });
