$(document).ready(function () {
  function Index() {
    this.test();
  }
  Index.prototype.test = function () {
    let source = $("#test").html();
    let template = Handlebars.compile(source);
    let html = template("test");
    $("body").html(html);
  };
  new Index();
});
