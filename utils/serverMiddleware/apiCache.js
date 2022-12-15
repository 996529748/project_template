const LRU = require("lru-cache");
export const cacheAPI = new LRU({
  max: 100, // 缓存队列长度 最大缓存数量
  maxAge: 1000 * 60 * 3, // 缓存时间 单位：毫秒
});

export default function (req, res, next) {
  next();
}
