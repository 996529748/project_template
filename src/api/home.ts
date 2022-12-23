import request from "../axios/axios";
import { domain } from "./baseUrlConfig";

// 帮助中心热门标签
export function getHotTag(
  config: GeneralParametersConfig
): Promise<HotTagListType> {
  return request.httpRequest<HotTagListType>({
    url: `${domain}/v1/xxx/xxx/`,
    method: "GET",
    // headers: { "X-token": "22222" },
    ...config,
  });
}
