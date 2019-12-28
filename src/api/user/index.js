import api from '../index'
import urls from '../matches/urls'
import qs from 'qs';

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
var paramsdata

export default {
  //佣金规则列表
  commissionlist(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')

    }
    return api.get(urls.matches + '/commission/list', Object.assign(paramsdata, params), header, response)
  },
  //增加規則
  commissionadd(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.post(urls.matches + '/commission/add', params, header, Object.assign(paramsdata, data), response)
  },
  //增加并邀请
  contactaddAndInvite(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.post(urls.matches + '/contact/addAndInvite', params, header, Object.assign(paramsdata, data), response)
  },
  ///获取单个佣金规则
  commissionid(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.get(urls.matches + '/commission/info', Object.assign(paramsdata, params), header, response)

  },
  //初始化新增页面
  commissionpreAdd(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.get(urls.matches + '/commission/preAdd', Object.assign(paramsdata, params), header, response)

  },
  //联系人列表
  contactlist(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.get(urls.matches + '/contact/list', Object.assign(paramsdata, params), header, response)

  },
  //邀请单个人 
  contactinvite(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.post(urls.matches + '/contact/invite', params, header, Object.assign(paramsdata, data), response)
  },
  //下级客户列表
  userlist(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.get(urls.matches + '/user/list', Object.assign(paramsdata, params), header, response)

  },
  ///signup
  usersignup(id, params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.get(urls.matches + '/user/signup/' + id, Object.assign(paramsdata, params), header, response)

  },
  //佣金规则修改 
  commissionedit(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.post(urls.matches + '/commission/edit', params, header, Object.assign(paramsdata, data), response)
  },
  //交易账户列表
  // usertradeAccounts(params,response) {
  //   paramsdata = ''
  //   paramsdata = {
  //     ln,
  //     token: sessionStorage.getItem('token'),tradeLoginId: sessionStorage.getItem('tradeLoginId')
  //   }
  //   return api.get(urls.matches + '/user/tradeAccounts', Object.assign(paramsdata, params), header,response)

  // },
  //入金 
  userstartDeposit(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.post(urls.matches + '/pay/startDeposit', params, header, Object.assign(paramsdata, data), response)
  },
  //出金
  userstartWithdraw(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.post(urls.matches + '/pay/startWithdraw', params, header, Object.assign(paramsdata, data), response)
  },
  //跟进列表
  followLoglist(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.get(urls.matches + '/followLog/list', Object.assign(paramsdata, params), header, response)
  },
  //用户资料
  userinfo(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.get(urls.matches + '/user/info', Object.assign(paramsdata, params), header, response)
  },
  //增加跟进记录
  followLogadd(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.post(urls.matches + '/followLog/add', params, header, Object.assign(paramsdata, data), response)
  },
  //删除跟进记录
  followLogdelete(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.post(urls.matches + '/followLog/delete', params, header, Object.assign(paramsdata, data), response)
  },
  //退出
  userlogout(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.get(urls.matches + '/user/logout', Object.assign(paramsdata, params), header, response)
  },
  //个人统计（我的收入）
  userstat(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.get(urls.matches + '/user/stat', Object.assign(paramsdata, params), header, response)
  },
  //佣金报表
  usercommissionReport(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.get(urls.matches + '/user/commissionReport', Object.assign(paramsdata, params), header, response)
  },
  //提现页面-选择交易账户
  usertradeAccounts(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.get(urls.matches + '/pay/tradeAccounts', Object.assign(paramsdata, params), header, response)
  },
  //提现页面-选择交易账户
  userbalance(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.get(urls.matches + '/pay/balance', Object.assign(paramsdata, params), header, response)
  },
  //删除跟进记录
  usermodifyPassword(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.post(urls.matches + '/user/modifyPassword', params, header, Object.assign(paramsdata, data), response)
  },
  // 客户经理-APP首页统计
  usermanagerStat(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.get(urls.matches + '/user/managerStat', Object.assign(paramsdata, params), header, response)
  },
  // 客户-佣金报表 排行
  usercommissionReport(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.get(urls.matches + '/user/commissionReport', Object.assign(paramsdata, params), header, response)
  },
  // 联系人信息
  contactinfo(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.get(urls.matches + '/contact/info', Object.assign(paramsdata, params), header, response)
  },
  // 重置交易密码-检查用户信息
  usergetResetTradePasswordToken(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.post(urls.matches + '/pay/getResetTradePasswordToken', params, header, Object.assign(paramsdata, data), response)
  },
  // 重置交易密码-设置新密码
  userresetTradePassword(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.post(urls.matches + '/pay/resetTradePassword', params, header, Object.assign(paramsdata, data), response)
  },
  //交易賬戶詳情 
  paytradeAccountInfo(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.get(urls.matches + '/pay/tradeAccountInfo', Object.assign(paramsdata, params), header, response)
  },
  //修改杠桿接口 pay/modifyLeverage
  paymodifyLeverage(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.post(urls.matches + '/pay/modifyLeverage', params, header, Object.assign(paramsdata, data), response)
  },
  // 删除规则
  commissiondelete(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.post(urls.matches + '/commission/delete', params, header, Object.assign(paramsdata, data), response)
  },
  //出入金列表 
  paytransLogs(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.get(urls.matches + '/pay/transLogs', Object.assign(paramsdata, params), header, response)
  },
  //交易信息列表 
  paytradeInfos(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.get(urls.matches + '/system/tradeInfos', Object.assign(paramsdata, params), header, response)
  },
  //新增銀行卡 
  bankAccountadd(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.post(urls.matches + '/bankAccount/add', params, header, Object.assign(paramsdata, data), response)
  },
  //银行账户列表 
  bankAccountlist(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.get(urls.matches + '/bankAccount/list', Object.assign(paramsdata, params), header, response)
  },
  //修改销售级别 
  contactmodifyRating(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.post(urls.matches + '/contact/modifyRating', params, header, Object.assign(paramsdata, data), response)
  },
  //已激活客戶 
  usermodifyRating(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.post(urls.matches + '/user/modifyRating', params, header, Object.assign(paramsdata, data), response)
  },
  //
  paytransLog(id, params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: localStorage.getItem('token')
    }
    return api.get(urls.matches + '/pay/transLog/' + id, Object.assign(paramsdata, params), header, response)

  },
  contactsave(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.post(urls.matches + '/contact/save', params, header, Object.assign(paramsdata, data), response)
  },
  //交易账户 
  payWithdraw(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.post(urls.matches + '/pay/preWithdraw', params, header, Object.assign(paramsdata, data), response)
  },
  //首页展示
  useruserStat(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.get(urls.matches + '/user/userStat', Object.assign(paramsdata, params), header, response)
  },
  usernetDepositStat(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId')
    }
    return api.get(urls.matches + '/user/netDepositStat', Object.assign(paramsdata, params), header, response)
  },
  //查看身份证 
  userfile(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId'),
      // userid:JSON.parse(sessionStorage.getItem('info')).id ,
    }
    return api.get(urls.matches + '/user/file', Object.assign(paramsdata, params), header, response)
  },

  //上传身份证文件 

  useruploadId(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId'),
      id: JSON.parse(sessionStorage.getItem('info')).id,
    }
    return api.post(urls.matches + '/user/uploadId', params, header, Object.assign(paramsdata, data), response)
  },
  //注册 完善资料
  userfillInfo(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId'),
      id: JSON.parse(sessionStorage.getItem('info')).id,
    }
    return api.post(urls.matches + '/user/fillInfo', params, header, Object.assign(paramsdata, data), response)
  },
  //注册-身份认证
  userfillIdentity(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId'),
      id: JSON.parse(sessionStorage.getItem('info')).id,
    }
    return api.post(urls.matches + '/user/fillIdentity', params, header, Object.assign({}, paramsdata, data), response)
  },
  //获取验证码 
  userverifyCode(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId'),
    }
    return api.post(urls.matches + '/user/verifyCode', params, header, Object.assign(paramsdata, data), response)
  },
  //重置密码 
  userresetPassword(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId'),
    }
    return api.post(urls.matches + '/user/resetPassword', params, header, Object.assign(paramsdata, data), response)
  },
  //交易账户综合 
  paytradeAccounts2(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId'),

    }
    return api.get(urls.matches + '/pay/tradeAccounts2', Object.assign(paramsdata, params), header, response)
  },
  //交易历史  /pay/mt5TradeLogs
  paymt5TradeLogs(params, response) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId'),

    }
    return api.get(urls.matches + '/pay/mt5TradeLogs', Object.assign(paramsdata, params), header, response)
  },
  //提交身份证照片
  userfillIdentity2(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId'),
    }
    return api.post(urls.matches + '/user/fillIdentity2', params, header, Object.assign(paramsdata, data), response)
  },
  //开始商务
  useropenPartner(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId'),
    }
    return api.post(urls.matches + '/user/openPartner', params, header, Object.assign(paramsdata, data), response)
  },
  //切换tradeLoginId
  usersetDeaultTradeLoginId(data, response, params, header) {
    paramsdata = ''
    paramsdata = {
      ln,
      token: sessionStorage.getItem('token'),
      tradeLoginId: sessionStorage.getItem('tradeLoginId'),
    }
    return api.post(urls.matches + '/user/setDeaultTradeLoginId', params, header, Object.assign(paramsdata, data), response)
  },
}