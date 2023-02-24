$(document).ready(function () {
  function Index() {
    this.test();
  }
  Index.prototype.test = function () {
    console.log("test");
  };
  new Index();
});
