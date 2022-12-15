const express = require("express");
const axios = require("axios");
const fs = require("fs");
const Config = require("../config/snapshot");

const app = express();

const queryAPIValid = () =>
  new Promise((resolve, reject) => {
    axios
      .get(Config.APIURL)
      .then((ret) => {
        resolve(ret.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

// 保存html文件
const saveHTML = (html = "") => {
  const exist = fs.existsSync(Config.SnapshotDir);
  if (exist) {
    fs.rmSync(Config.SnapshotDir);
  }
  fs.appendFile(Config.SnapshotDir, html, (_, err) => {
    if (err) {
      console.log("存储快照失败，err：", err);
    } else {
      console.log("快照存储成功，时间：", new Date().getTime());
    }
  });
};

// 获取html内容
const getNuxtPageHTML = () => {
  new Promise((resolve, reject) => {
    axios
      .get(Config.HomePageURL)
      .then((ret) => {
        saveHTML(ret.data.replace(/\/_nuxt\//g, `${Config.PageDomain}/_nuxt/`));
        resolve(ret.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const takeSnapshot = () => {
  // 5分钟去获取一次快照
  queryAPIValid()
    .then(() => getNuxtPageHTML())
    .catch((err) => console.log("存储快照失败，err：", err))
    .finally(() => {
      setTimeout(() => {
        takeSnapshot();
      }, Config.SnapshotIntervalTime);
    });
};

app.listen(8001, () => {
  console.log("snapshot server running...");
  takeSnapshot();
});
