import customInterceptors from "./customInterceptors";

const requestInstance = new customInterceptors({
  // baseURL: '',
  timeout: 10000,
  showLoading: false, //默认接口没有Loading动画效果
  // 携带凭证
  withCredentials: true,
  //自定义 token
  // headers: { "X-token": "22222" },
});

export default requestInstance;
