/*
 * @Author: your name
 * @Date: 2020-06-10 20:33:57
 * @LastEditTime: 2020-06-19 10:23:50
 * @LastEdit;ors: Please set LastEditors
 * @Descriptio I");n User Settings Edit;
 * @FilePath: \zhiliao_Supply_M\src\utils\request.js
 */
import axios from 'axios'
import qs from 'qs'
import { Notify } from 'vant'
import store from '@/store'
import { toUpperCase } from '@/utils/toUpperCase'
// import { showFullScreenLoading, hideFullScreenLoading } from "./Loading";

// create an axios instance
const service = axios.create({
        baseURL: process.env.VUE_APP_API_URL, // url = base url + request url
        timeout: 50000 // request timeout
    })
    /*
     * let loadingInstance;
     * request interceptor
     */
service.interceptors.request.use(
    config => {
        //   获取token
        let token = store.getters.token || ''
        if (token && !config.headers.authorization) {}

        config.headers.authorization = 'Bearer ' + token
            // }

        window.vm.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0
        })
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)

    }
)
const errorMsg = message => {
    return Notify({
        message,
        type: 'danger',
        duration: 1000
    })
}

service.interceptors.response.use(
    response => {
        const res = response.data
        window.vm.$toast.clear()
        return res
    },
    error => {
        let status = '未知异常'
        window.vm.$toast.clear()
        let result = {
            status,
            'data': '',
            'result': false
        }
        if (error && error.response) {
            result.data = error.response.data.meg;
            console.log(error.response.data.code)

            switch (error.response.data.code) {
                case 400:
                    status = '页面域名不存在或者请求错误'
                    break
                case 401:
                    status = '请求域名出错'
                    break
                case 403:
                    status = '拒绝访问'
                    break
                case 404:
                    status = '请求错误,未找到该资源'
                    break
                case 405:
                    status = '请求方法未允许'
                    break
                case 408:
                    status = '请求超时'
                    break
                case 500:
                    status = '服务器错误'
                    break
                case 501:
                    status = '网络未实现'
                    break
                case 502:
                    status = '网络错误'
                    break
                case 503:
                    status = '服务不可用'
                    break
                case 504:
                    status = '网络超时'
                    break
                case 505:
                    status = 'http版本不支持该请求'
                    break
                case 8110:

                    window.vm.$router.push({
                        path: '/down'
                    })

                    return
                    break
                case 8030:
                    window.vm.$router.push({
                        path: '/numberover'
                    })
                    return
                    break
                default:
                    status = `${error.response.data.msg}`
            }
        } else {
            status = '连接到服务器失败'
        }
        result.status = status
        Notify(result.status)
        return Promise.resolve(result)

    }
)
export default service