//通用config
interface GeneralParametersConfig {
  showLoading:boolean,
}

//接口数据列表类型
interface HotTagList {
  id: number;
  name: string;
  position: number;
  rel: string;
  url: string;
}

// 接口响应类型
interface HotTagListType {
  data: HotTagList[];
  msg: string;
  ret: number;
}
