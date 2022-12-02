import { useRoute } from "vue-router";
import { watch } from "vue";
//TDK写入
export default function () {
  const router = useRoute();
  watch(router, () => {
    const routerMeta = router.meta;
    document.title = routerMeta.title;
    const metaElement = document.createElement("meta");
    const metaElementKeyWord = document.createElement("meta");
    if (routerMeta?.description) {
      metaElement.setAttribute("name", "description");
      metaElement.setAttribute("content", routerMeta.description);
      document.getElementsByTagName("head")[0].appendChild(metaElement);
    }

    if (routerMeta?.keywords) {
      metaElementKeyWord.setAttribute("name", "keywords");
      metaElementKeyWord.setAttribute("content", routerMeta.keywords);
      document.getElementsByTagName("head")[0].appendChild(metaElementKeyWord);
    }
  });
}
