import api from '../index'
import urls from './urls'


const header = {}
var localeLanguage = sessionStorage.getItem('localeLanguage')
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
const paramsdata = {
  ln
}
export default {


  //注册
  register(data, response ,params, header) {
    return api.post(urls.matches + '/user/signup', params, header, data,response)
  },
  //登录
  login(data, response ,params, header) {
    return api.post(urls.matches + '/user/login', params, header, data,response)
  },
  //重置密码-检查用户信息
  getResetPasswordTokenn(data, response ,params, header) {
    return api.post(urls.matches + '/user/getResetPasswordToken', params, header, data,response)
  },
  //修改密码
  resetPassword(data, response ,params, header) {
    return api.post(urls.matches + '/user/resetPassword', params, header, data,response)
  },
  //注册-完善资料
  fillInfo(data, response ,params, header) {
    return api.post(urls.matches + '/user/fillInfo', params, header, data,response)
  },
  //国家列表
  countries(params,response) {
    return api.get(urls.matches + '/system/countries', Object.assign(paramsdata, params), header,response)
  },
  //投资目标列表
  systeminvestAims(params,response) {
    return api.get(urls.matches + '/system/investAims', Object.assign(paramsdata, params), header,response)
  },
  //收入来源列表 
  systemincomeSources(params,response) {
    return api.get(urls.matches + '/system/incomeSources', Object.assign(paramsdata, params), header,response)
  },
  //就业状况 /system/employments
  systememployments(params,response) {
    return api.get(urls.matches + '/system/employments', Object.assign(paramsdata, params), header,response)
  },
  // 行业列表 
  systembusinesses(params,response) {
    return api.get(urls.matches + '/system/businesses', Object.assign(paramsdata, params), header,response)
  },
  // 投资经验列表 
  systeminvestExps(params,response) {
    return api.get(urls.matches + '/system/investExps', Object.assign(paramsdata, params), header,response)
  },
  // 投资频率列表 
  systeminvestFreqs(params,response) {
    return api.get(urls.matches + '/system/investFreqs', Object.assign(paramsdata, params), header,response)
  },

  // 合并下拉列表接口 
  systemfillInfoCommonList(params,response) {
    return api.get(urls.matches + '/system/fillInfoCommonList', Object.assign(paramsdata, params), header,response)
  },
  //初始化新增页面
  commissionpreAdd(params,response) {
    return api.get(urls.matches + '/commission/preAdd', Object.assign(paramsdata, params), header,response)
  },
//销售评级列表
systemratings(params,response) {
  return api.get(urls.matches + '/system/ratings',  Object.assign(paramsdata, params), header,response)
},
//获取客户端IP对应的国家相关信息 
systemlocation(params,response) {
  return api.get(urls.matches + '/system/location',  Object.assign(paramsdata, params), header,response)
},
//身份证识别接口
havetoken(params,response) {
  return api.get('https://aip.baidubce.com/oauth/2.0/token',  Object.assign(paramsdata, params), header,response)
},
//汉字转拼音 
systempinyin(params,response) {
  return api.get(urls.matches + '/system/pinyin',  Object.assign({},paramsdata, params), header,response)
},
//银行列表
systembanks(params,response) {
  return api.get(urls.matches + '/system/banks',  Object.assign({},paramsdata, params), header,response)
},
}