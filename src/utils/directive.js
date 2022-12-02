export default (vue) => {
  vue.directive("webp", {
    bind: (el) => {
      //先判断浏览器是否支持webp
      let isWebp = false;
      let elem = document.createElement("canvas");
      if (!!(elem.getContext && elem.getContext("2d"))) {
        isWebp = elem.toDataURL("image/webp").indexOf("data:image/webp") === 0;
      }
      //将属性保存在el中
      el.isWebp = isWebp;
    },
    inserted: (el, binding) => {
      el.updateImg = (el, binding) => {
        if (el.isWebp && !binding.value.includes("data:image/png")) {
          el.src = binding.value.toString().replace(/$/g, ".webp");
          //  el.src = binding.value.toString().replace(/\.(png|jpe?g|gif|svg|bmp)$/g, ".webp");
        } else {
          el.src = binding.value;
        }
      };
      el.updateImg(el, binding);
    },
    update: (el, binding) => {
      el.updateImg(el, binding);
    },
  });
  vue.directive("webp-bg", {
    bind: (el) => {
      //先判断浏览器是否支持webp
      let isWebp = false;
      let elem = document.createElement("canvas");
      if (!!(elem.getContext && elem.getContext("2d"))) {
        isWebp = elem.toDataURL("image/webp").indexOf("data:image/webp") === 0;
      }
      // 将属性保存在el中
      el.isWebp = isWebp;
    },
    inserted: (el, vnode) => {
      el.updateBG = (el, vnode) => {
        // 背景图片地址
        let bgUrl = vnode.value.toString() + (el.isWebp ? ".webp" : "");
        if (el.isWebp && !vnode.value.includes("data:image/png")) {
          bgUrl = vnode.value.toString() + (el.isWebp ? ".webp" : "");
          //  el.src = binding.value.toString().replace(/\.(png|jpe?g|gif|svg|bmp)$/g, ".webp");
        } else {
          bgUrl = vnode.value.toString();
        }
        el.style.backgroundImage = `url('${bgUrl}')`;
      };
      el.updateBG(el, vnode);
    },
    update: (el, binding) => {
      el.updateBG(el, binding);
    },
  });
};
