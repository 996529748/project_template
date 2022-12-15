import request from "./request";
import { domain } from "./baseUrlConfig";
//请求用户信息
export function getUseInfo() {
  return request({
    url: `${domain}/xxx/xxx`,
  });
}
