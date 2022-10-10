import { RouteMeta, useRoute } from "vue-router"
import { watch } from "vue"

interface MetaConfig extends RouteMeta {
    title:string,
    description:string,
    keywords:string
}

export default function(){
    const router = useRoute();
    watch(router, () => {
        let routerMeta = router.meta as MetaConfig;
        document.title = routerMeta.title;
        let metaElement = document.createElement('meta');
        let metaElementKeyWord = document.createElement('meta');
         if(routerMeta?.description){
            metaElement.setAttribute('name','description');
            metaElement.setAttribute('content',routerMeta.description);
            document.getElementsByTagName('head')[0].appendChild(metaElement);
        }
        
        if(routerMeta?.keywords){
            metaElementKeyWord.setAttribute('name','keywords');
            metaElementKeyWord.setAttribute('content',routerMeta.keywords);
            document.getElementsByTagName('head')[0].appendChild(metaElementKeyWord);
        }
    })
}