import { AxiosRequestConfig } from 'axios'

//自定义参数类型
export default interface customRequestConfig extends AxiosRequestConfig{

    showLoading?:boolean

}