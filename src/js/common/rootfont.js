//根据屏幕大小改变根元素字体大小
(function(doc, win) {
    var docEl = doc.documentElement;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var innerWidth = window.innerWidth;
            if (!innerWidth) return;
            if (innerWidth >= 1920) {//1920 = 需要兼容4K设计稿的尺寸，变更尺寸需在全局css样式中修改对应初始font-size
                docEl.style.fontSize = 100/1920*100+'vw';
            } else {
                docEl.style.fontSize = '100px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
