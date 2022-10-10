
import request from '../axios/axios'
import { domain } from "./baseUrlConfig";
// 帮助中心热门标签
export function getHotTag(config:any):any {
  return request.customRequest({
    url: `${domain}/v1/friendly/link/list`,
    method: "GET",
    ...config
  });
}