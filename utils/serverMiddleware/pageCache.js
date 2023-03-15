import { cacheAPI } from "./apiCache";
const cheerio = require("cheerio");
const beautify = require("js-beautify");
const LRU = require("lru-cache");
export const cachePage = new LRU({
  max: 100, // 缓存队列长度 最大缓存数量
  maxAge: 1000 * 60 * 5, // 缓存时间 单位：毫秒
});

// html代码美化 美化vue区块代码会导致问题，暂时只美化head部分代码
const formatHtml = (data) => {
  if (!data) return data;
  const $ = cheerio.load(data);
  const head = $("head").html();
  const beautifyHead = beautify.html(head);
  $("</br>").appendTo($("title"));
  $("head").html(beautifyHead);
  const title = $("title");
  $("meta[data-hid=charset]").before(title);
  return $.html();
};

export default function (req, res, next) {
  const pathname = req.url;
  // 设置特定的路由用以删除缓存（不需要的话可以删除）
  if (pathname === "/xxx/clearCache") {
    cachePage.reset();
    cacheAPI.reset();
    res.end("缓存清除成功", "utf-8");
    return;
  }

  // 是否已经在缓存中，如果已存在则读取缓存
  const existsHtml = cachePage.get(pathname);
  if (existsHtml) {
    //  如果没有Content-Type:text/html 的 header，gtmetrix网站无法做测评
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Length": Buffer.byteLength(existsHtml.html, "utf8"),
    });
    return res.end(existsHtml.html, "utf-8");
  }

  res.originalEnd = res.end;
  res.end = function (data) {
    const result = formatHtml(data);
    if (result) {
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Length": Buffer.byteLength(result, "utf8"),
      });

      if (res.statusCode === 200) {
        // 设置缓存
        cachePage.set(pathname, {
          html: result,
        });
      }

      res.originalEnd(result);
    } else {
      res.originalEnd(result);
    }
  };

  next();
}
