// 用来判断服务是否可以访问的接口
const APIURL = `https://xxxxxxxxxxxxx`;
// 需要缓存的页面
const HomePageURL = `https://www.xxxxxxxxxxx.cn/`;
// 缓存页面所用到的静态资源的所属域名
const PageDomain = `https://www.xxxxxxxxxxx.cn/`;
// 快照文件位置
const SnapshotDir = `./servers/snapshot/homePage.html`;
// 快照间隔时间
const SnapshotIntervalTime = 1000 * 60 * 5;

module.exports = {
  APIURL,
  HomePageURL,
  PageDomain,
  SnapshotDir,
  SnapshotIntervalTime
}
