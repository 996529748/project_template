// template.js
module.exports = {
  template: (componentName, isSecondaryDirectory) => `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset = "utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <meta name="description" content="">
      <meta name="keywords" content="">
      <meta property="og:type" content="soft" />
      <meta property="og:description" content="" />
      <meta property="og:soft:file_size" content="" />
      <meta property="og:soft:operating_system" content="Win10/Win8/Win7/WinXP" />
      <meta property="og:image" content="" />
      <meta property="og:release_date" content="" />
      <meta property="og:title" content="" />
      <meta property="og:soft:language" content="" />
      <meta property="og:soft:license" content="" />
      <meta property="og:soft:url" content="" />
      <title></title>
    <!-- build:css ${isSecondaryDirectory?'../':'./'}css/${isSecondaryDirectory?`${componentName}/`:''}${componentName}.css -->
    <link rel="stylesheet" type="text/css" href="${isSecondaryDirectory?'../':'./'}css/globals.css">
    <link rel="stylesheet" type="text/css" href="${isSecondaryDirectory?'../':'./'}css/${isSecondaryDirectory?`${componentName}/`:''}${componentName}.css">
    <!-- endbuild -->
    <link rel="shortcut icon" href="${isSecondaryDirectory?'../':'./'}favicon.ico" type="image/x-icon" />
    <link rel="canonical" href="http://editor.foxitsoftware.cn/" />
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
