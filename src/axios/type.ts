import type { AxiosRequestConfig } from "axios";

//自定义参数类型
interface customRequestConfig extends AxiosRequestConfig {
  showLoading?: boolean;
}

export default customRequestConfig;
