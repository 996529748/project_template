import type { AxiosInstance, AxiosError } from "axios";
import axios from "axios";
import type customRequestConfig from "./type";
import { getErrMessage } from "./errCode";
import { Toast } from "vant";

type toastInstance = ReturnType<typeof Toast.loading>; //取 Toast.loading 值的返回值，既  var Toast.loading: (options: string | ToastOptions) => ComponentInstance

const DEFAULT_LOADING = true; //默认loading显示 or 隐藏的变量

class customInterceptors {
  instance: AxiosInstance;
  showLoading: boolean;
  toastInstance: toastInstance | undefined;

  constructor(config: customRequestConfig) {
    this.instance = axios.create(config); //根据传入配置手动创建实例
    this.showLoading = config.showLoading ?? DEFAULT_LOADING; //当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数
    this.init();
  }

  init(): void {
    this.instance.interceptors.request.use(
      (res) => {
        if (this.showLoading) {
          //创建toast实例
          this.toastInstance = Toast.loading({
            duration: 0,
            message: "加载中...",
            forbidClick: true,
          });
        }
        return res;
      },

      (err) => {
        this.toastInstance?.clear();
        console.log(err);
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        setTimeout(() => {
          this.toastInstance?.clear();
        }, 1000);
        //TODO
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return res.data;
      },

      (error: AxiosError) => {
        this.toastInstance?.clear();
        const err = getErrMessage(error);
        console.log(err);
      }
    );
  }

  //自定义请求
  httpRequest<T>(config: customRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 定制该请求是否加loading。当为传入该参数时，默认为true
      if (config.showLoading && config.showLoading) {
        this.showLoading = true;
      }
      this.instance.request<unknown, T>(config).then(
        (res) => resolve(res),

        (err) => {
          this.showLoading = DEFAULT_LOADING;
          return reject(err);
        }
      );
    });
  }

  //jsonp自行扩展封装
  jsonpRequest<T>(config: customRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 定制该请求是否加loading。当为传入该参数时，默认为true
      if (config.showLoading && config.showLoading) {
        this.showLoading = true;
      }

      // 根据时间戳生 + 随机数成一个callback回调名
      const callbackName =
        `jsonp_${new Date().getTime()}` +
        `${Math.random().toString().replace(/\D/g, "")}`;

      // 字符串拼接生成基本url
      const baseUrl =
        config.url &&
        `${config.url}${
          config.url.indexOf("?") === -1 ? "?" : "&"
        }jsonpcallback=${callbackName}`;
      const jsonp = document.createElement("script");
      jsonp.type = "text/javascript";
      jsonp.src = baseUrl as string;
      document.getElementsByTagName("head")[0].appendChild(jsonp);
      // 给window添加属性，用于获取jsonp结果
      window[callbackName] = (res: T): void => {
        if (res) {
          resolve(res);
        } else {
          reject(`请求失败`);
        }
        // 删除window下属性
        delete window[callbackName];
        // 得到结果后删除创建的script
        setTimeout(() => {
          document.getElementsByTagName("head")[0].removeChild(jsonp);
        }, 500);
      };
    });
  }
}

export default customInterceptors;
