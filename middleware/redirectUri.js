// 路由url封闭--seo
export default function ({ req, redirect }) {
  if (process.server) {
    const url = req.originalUrl;
    const isItClosed = url.split("?")[0].endsWith("/");
    const hasQuery = url.includes("?");
    if (!isItClosed) {
      const newUrl = !hasQuery ? url + "/" : url.split("?").join("/?");
      redirect(newUrl);
    }
  }
}
