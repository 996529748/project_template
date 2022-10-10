import { createMetaManager } from 'vue-meta'
export default createMetaManager(false, {
    meta: { tag: 'meta', nameless: true },//脚手架内重写方法
})