// template.js
module.exports = {
  appTemplate: (componentName, isSecondaryDirectory) => `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
      <meta name="applicable-device" content="pc,mobile"/>
      <!-- default(white), black, black-translucent -->
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-touch-fullscreen" content="yes" />
      <meta name="apple-mobile-web-app-title" content="">
      <meta name="App-Config" content="fullscreen=yes,useHistoryState=no,transition=no">
      <meta name="format-detaction" content="telephone=no,email=no">
      <meta http-equiv="Cache-Control" content="no-siteapp" />
      <meta name="HandheldFriendly" content="true">
      <meta name="MobileOptimized" content="750">
      <meta name="screen-orientation" content="portrait">
      <meta name="x5-orientation" content="portrait">
      <meta name="full-screen" content="yes">
      <meta name="x5-fullscreen" content="true">
      <meta name="browsermode" content="application">
      <meta name="x5-page-mode" content="app">
      <meta name="msapplication-tap-highlight" content="no">
      <meta name="renderer" content="webkit">
      <meta property="og:type" content="soft" />
      <meta property="og:description" content="" />
      <meta property="og:soft:file_size" content="" />
      <meta property="og:soft:operating_system" content="Win10/Win8/Win7/WinXP" />
      <meta property="og:image" content="${isSecondaryDirectory?'../':'./'}favicon.ico" />
      <meta property="og:release_date" content="" />
      <meta property="og:title" content="" />
      <meta property="og:soft:language" content="简体中文" />
      <meta property="og:soft:license" content="" />
      <meta property="og:soft:url" content="" />
      <title>标题</title>
    <!-- build:css ${isSecondaryDirectory?'../':'./'}css/${isSecondaryDirectory?`${componentName}/`:''}${componentName}.css -->
    <link rel="stylesheet" type="text/css" href="${isSecondaryDirectory?'../':'./'}css/globals.css">
    <link rel="stylesheet" type="text/css" href="${isSecondaryDirectory?'../':'./'}css/${isSecondaryDirectory?`${componentName}/`:''}${componentName}.css">
    <!-- endbuild -->
    <link rel="shortcut icon" href="${isSecondaryDirectory?'../':'./'}favicon.ico" type="image/x-icon" />
    <link rel="canonical" href="" />
    <script src="https://sso.foxitreader.cn/getCookies"></script>
    <script>
      var _hmt = _hmt || [];
      (function() {
      var hm = document.createElement("script");
      // hm.src = "https://hm.baidu.com/hm.js?2b9d788efb2c7f20deee6d2e671bd134";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
      })();
    </script>
    </head>
    <body>
    </body>
    <!-- 示例 -->
    <script id="test" type="text/x-handlebars-template">
      <p>{{this}}</p>
    </script>
    <script type="text/javascript" src="https://cdn.foxitreader.cn/js/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdn.foxitreader.cn/js/jquery.cookie.js"></script>
    <script type="text/javascript" src="https://cdn.foxitreader.cn/handlebars/handlebars.js"></script>
    <script type="text/javascript" src="https://cdn.foxitreader.cn/js/polyfill.js"></script>
    <script type="text/javascript" src="https://pdf2word-foxit.oss-cn-shanghai.aliyuncs.com/statisticsCookie.js"></script>
    <script type="text/javascript" src="./js/common/rootfont.js"></script>
    <!-- build:js ${isSecondaryDirectory?'../':'./'}js/${isSecondaryDirectory?`${componentName}/`:''}${componentName}.js -->
    <script type="text/javascript" src="${isSecondaryDirectory?'../':'./'}js/${isSecondaryDirectory?`${componentName}/`:''}${componentName}.js"></script>
    <!-- endbuild -->
    </html>`
};
