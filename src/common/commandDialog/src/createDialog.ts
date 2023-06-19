import DialogCompontent from "./dialog.vue";
import vant from "vant";
import { App, ComponentPublicInstance, createApp, watch } from "vue";

const hideDialog = (app: App<Element>) => {
  app.unmount();
};

//展示弹窗
const showDialog = (
  app: App<Element>,
  { resolve, reject }: PromiseCallback
) => {
  const dom = document.createDocumentFragment();
  const vm = app
    .use(vant)
    .mount(dom as unknown as Element) as ComponentPublicInstance<
    { params: Record<string, unknown> },
    { setVisible: (params: boolean) => void },
    { state: Record<string, unknown> }
  >;

  document.body.appendChild(dom);
  vm.setVisible(true);
  //监听开关变量处理
  watch(vm.state, (state) => {
    if (!state.visible) {
      switch (state.type) {
        case "cancel":
          reject("点击cancel");
          break;

        case "confirm":
          resolve("点击confirm");
          break;

        default:
          break;
      }

      //销毁实例
      hideDialog(app);
    }
  });
};

//创建实例
const createDialog = (option: OptionType) => {
  const DialogApp = createApp(DialogCompontent, { ...option });
  return new Promise((resolve, reject) => {
    showDialog(DialogApp, { resolve, reject });
  });
};

export default createDialog;
