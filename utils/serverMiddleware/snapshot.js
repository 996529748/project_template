import axios from "axios";
import fs from "fs";
const Config = require("../../config/snapshot");

export default function (req, res, next) {
  console.log("process.cwd()", req.headers.accept);
  if (req.headers.accept.includes("html")) {
    console.log("进入请求");
    axios
      .get(Config.APIURL)
      .then(() => {
        next();
      })
      .catch(() => {
        console.log("触发");
        const fileHtml = fs.readFileSync(Config.SnapshotDir);
        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
          "Content-Length": Buffer.byteLength(fileHtml, "utf8"),
        });
        return res.end(fileHtml, "utf-8");
      });
  } else {
    next();
  }
}
