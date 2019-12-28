import axios from 'axios'
import qs from 'qs';
import vues from '../main.js'
// 创建 axios 实例
let service = axios.create({
    // headers: {'Content-Type': 'application/json'},
    timeout: 10000
})

// 设置 post、put 默认 Content-Type
// service.defaults.headers.post['Content-Type'] = 'application/json'
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
service.defaults.headers.put['Content-Type'] = 'application/json'

var localeLanguage =  sessionStorage.getItem('localeLanguage') 
if (localeLanguage == 'zh') {
    //简体中文
    var ln = 'zh_CN'
  } else if (localeLanguage == 'en') {
    // 英语
    var ln = 'en_GB'
  } else if (localeLanguage == 'AR') {
    //阿拉伯语
    var ln = 'zh_CN'
  } else if (localeLanguage == 'zhHk') {
    //繁体中文
    var ln = 'zh_TW'
  } else if (localeLanguage == 'th') {
    //泰语
    var ln = 'th_TH'
  }
var paramsdata

// 添加请求拦截器
service.interceptors.request.use(
    (config) => {
        if (config.method === 'post' || config.method === 'put') {
            paramsdata = ''
            paramsdata = {
                ln
            }
            // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
    
            config.data = qs.stringify(Object.assign(paramsdata, config.data))
        }
        // 请求发送前进行处理
        return config
    },
    (error) => {
        // 请求错误处理
        return Promise.reject(error)
    }
)

// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        let { data } = response
        return data
    },
    (error) => {
        // alert(123)
        // vues.$t('')
        vues.$message(vues.$t('err.network') )
        // vues.$router.push("/login");
        // let info = {},
        //     { status, statusText, data } = error.response

        // if (!error.response) {
        //     info = {
        //         code: 5000,
        //         msg: 'Network Error'
        //     }
        // } else {
        //     // 此处整理错误信息格式
        //     info = {
        //         code: status,
        //         data: data,
        //         msg: statusText
        //     }
        // }
        
    }
)

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default function() {
    return service
}