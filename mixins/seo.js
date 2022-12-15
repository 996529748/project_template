import { seoConfig } from "config/seoConfig.js"; //SEO配置文件
/**
 * [setSeo 写入seo]
 *
 * @param   {[type]}  route  [route 当前页面路由]
 *
 * @return  {[type]}         [return description]
 */
const setSeo = (route) => {
  const routeName = route.name;
  const seo = seoConfig[routeName];
  let metaData = [
    {
      // set meta
      name: "description",
      hid: "description",
      content: seo.descriptionContent,
    },
    {
      hid: "keywords",
      name: "keywords",
      content: seo.keywordsContent,
    },
    {
      name: "renderer",
      content: "webkit",
    },
    {
      property: "og:title",
      hid: "og:title",
      content: seo.title,
    },
    {
      property: "og:type",
      hid: "og:type",
      content: "website",
    },
    {
      property: "og:description",
      hid: "og:description",
      content: seo.descriptionContent,
    },
    {
      property: "og:image",
      hid: "og:image",
      content: seo.ogImage,
    },
  ];
  const link = [{ rel: "canonical" }];
  return {
    metaData,
    title: seo.title,
    link,
  };
};
export default {
  head() {
    const { metaData = [], title = "", link = [] } = setSeo(this.$route);
    return {
      title,
      meta: metaData,
      link,
    };
  },
};
