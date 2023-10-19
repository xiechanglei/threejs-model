import {log, error, hideHeaderLog} from "@/common/log";
import {apiServerBase, showLog} from "@/config";
import axios from "axios"
// 自定义axios实例
export const axiosClient = axios.create({
    baseURL: apiServerBase
});

/**
 * 发送请求之前进行的处理
 */
const beforeRequest = (config: any) => {
    config.requestTime = Date.now()
    return config
}

/**
 * 发送请求之前出现的错误
 */
const beforeRequestError = (error: unknown) => {
    // TODO 处理发送数据之前产生的异常
    return Promise.reject(error)
}

/**
 * 响应之后进行的处理,目前后端的接口请求格式是将状态码放在response中的code中，需要在这里统一
 */
const afterResponse = (response: any) => {
    if (showLog) {
        printAjax(response)
    }
    //TODO 数据统统一处理流程，简化业务代码中解构的过程
    return response.data
}
/**
 * 响应之后出现的错误
 */
const responseError = (error: any) => {
    // TODO 处理发送数据之后产生的异常
    printAjax(error.response)
    return Promise.reject(error)
}


const printAjax = (response: any) => {
    const code = response.status
    const [requestUri, queryParam] = response.config.url.split("?")
    const method = response.config.method
    const title = `${method.toUpperCase()} ${code} ${requestUri}`
    let requestParam = response.config.params ?? {}
    if (method === "get" && queryParam !== undefined) {
        requestParam = queryParam.split("&").reduce((acc: any, item: any) => {
            const [key, value] = item.split("=")
            acc[key] = value
            return acc
        }, {})
    }
    code === 200 ? log(title) : error(title)
    hideHeaderLog(title, "请求耗时", `${Date.now() - response.config.requestTime}ms`)
    hideHeaderLog(title, "请求参数", requestParam)
    hideHeaderLog(title, "请求结果", response.data)
}


// 添加请求拦截器
axiosClient.interceptors.request.use(beforeRequest, beforeRequestError)

// 添加响应拦截器
axiosClient.interceptors.response.use(afterResponse, responseError)