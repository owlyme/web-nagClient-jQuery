import Vue from 'vue';
import Router from 'vue-router';
import i18n from '@/i18n/i18.js'
Vue.use(Router);
// 登录

//注册
let register = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/background/register'))
        })
    }
    //注册dome
let signupdemo = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/page/signupdemo'))
        })
    }
    //完善资料
let Information = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/page/Information'))
        })
    }
    //忘记密码
let forgotpassword = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/background/forgotpassword'))
        })
    }
    //补充资料
let upload = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/background/upload'))
        })
    }
    //我的工作台
let home = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/background/home'))
        })
    }
    // 入金
let Deposit = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/background/Deposit'))
        })
    }
    //出金
let withdraw = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/background/withdraw'))
        })
    }
    //出入金明细
let accountdetails = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/background/accountdetails'))
        })
    }
    //交易历史
let transactionrecord = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/background/transactionrecord'))
        })
    }
    //待激活客户
let Toactivate = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/background/Toactivate'))
        })
    }
    //已激活客户
let Activated = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/background/Activated'))
        })
    }
    //完善资料
let dataverification = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/background/dataverification'))
        })
    }
    //交易信息
let market = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/background/market'))
        })
    }
    //佣金规则
let Rulescommission = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/background/Rulescommission'))
        })
    }
    //佣金詳情
let Rulesiscommission = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/background/Rulesiscommission'))
        })
    }
    //新增佣金規則
let Rules = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/background/Rules'))
        })
    }
    //新增银行卡
let addwithdraw = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/background/addwithdraw'))
        })
    }
    //新增用户
let adduser = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/background/adduser'))
        })
    }
    //联系人详情
let details = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/background/details'))
        })
    }
    //已激活详情
let activateddetails = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/background/activateddetails'))
        })
    }
    //修改密码
let changepassword = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/background/changepassword'))
        })
    }
    //修改賬戶
let changeuser = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/background/changeuser'))
        })
    }
    //佣金报表ib
let commissionib = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/background/commissionib'))
        })
    }
    //注册
let signup = (resolve) => {
        return require.ensure([], () => {
            resolve(require('@/components/page/signup'))
        })
    }
    //注冊信息
let logMessage = (resolve) => {
    return require.ensure([], () => {
        resolve(require('@/components/background/logMessage'))
    })
}
export default new Router({
    routes: [{
            path: '/',
            redirect: '/home',
            meta: {
                islogin: true,
                title: i18n.t('leftlist.title2')
            },
        },
        {
            path: '/register-live',
            name: 'register-live',
            meta: {
                islogin: false,
                title: 'live'
            },
            component: signup,
        },
        {
            path: '/forgotpassword',
            name: 'forgotpassword',
            meta: {
                islogin: false,
                title: i18n.t('message.fgpaswd')
            },
            component: forgotpassword,
        }, {
            path: '/register-demo',
            name: 'register-demo',
            meta: {
                islogin: false,
                title: i18n.t('replenished.hint14')
            },
            component: signupdemo,
        },
        {
            path: '/',
            component: () =>
                import ( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { 
                islogin: true,
                title: i18n.t('leftlist.title2') },
            children: [{
                    path: '/home',
                    name: 'home',
                    meta: {
                        islogin: true,
                        title: i18n.t('leftlist.title2')
                    },
                    component: home,
                },
                // {
                //     path: '/dashboard',
                //     component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                //     meta: { title: '系统首页' }
                // },
                {
                    path: '/icon',
                    component: () =>
                        import ( /* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () =>
                        import ( /* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () =>
                        import ( /* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () =>
                        import ( /* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () =>
                        import ( /* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () =>
                        import ( /* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                // {
                //     // 图片上传组件
                //     path: '/upload',
                //     component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                //     meta: { title: '文件上传' }
                // },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () =>
                        import ( /* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () =>
                        import ( /* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () =>
                        import ( /* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () =>
                        import ( /* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () =>
                        import ( /* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () =>
                        import ( /* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () =>
                        import ( /* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () =>
                        import ( /* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }, {
                    path: '/deposit',
                    name: 'deposit',
                    meta: {
                        islogin: true,
                        title: "入金",
                    },
                    component: Deposit,
                }, {
                    path: '/withdraw',
                    name: 'withdraw',
                    meta: {
                        islogin: true,
                        title: i18n.t('message.withdraw'),
                    },
                    component: withdraw,
                }, {
                    path: '/transactionrecord',
                    name: 'transactionrecord',
                    meta: {
                        islogin: true,
                        title: i18n.t('message.TransactionHistory'),
                    },
                    component: transactionrecord,
                }, {
                    path: '/toactivate',
                    name: 'toactivate',
                    meta: {
                        islogin: true,
                        title: i18n.t('replenished.hint42')
                    },
                    component: Toactivate,
                }, {
                    path: '/Activated',
                    name: 'Activated',
                    meta: {
                        islogin: true,
                        title: i18n.t('message.Activated') + i18n.t('message.customer'),
                    },
                    component: Activated,
                }, {
                    path: '/dataverification',
                    name: 'dataverification',
                    meta: {
                        islogin: true,
                        title: i18n.t('title.dataverification'),
                    },
                    component: dataverification,
                }, {
                    path: '/market',
                    name: 'market',
                    meta: {
                        islogin: true,
                        title: i18n.t('title.tradeinformation'),
                    },
                    component: market,
                }, {
                    path: '/Rulescommission',
                    name: 'Rulescommission',
                    meta: {
                        islogin: true,
                        title: i18n.t('leftlist.title4'),
                    },
                    component: Rulescommission,
                }, {
                    path: '/Rulesiscommission',
                    name: 'Rulesiscommission',
                    meta: {
                        islogin: true,
                        title: i18n.t('message.commission'),
                    },
                    component: Rulesiscommission,
                }, {
                    path: '/Rules',
                    name: 'Rules',
                    meta: {
                        islogin: true,
                        title: i18n.t('button.add'),
                    },
                    component: Rules,
                },
                {
                    path: '/addwithdraw',
                    name: 'addwithdraw',
                    meta: {
                        islogin: true,
                        title: i18n.t('deposit.hint4'),
                    },
                    component: addwithdraw,
                }, {
                    path: '/adduser',
                    name: 'adduser',
                    meta: {
                        islogin: true,
                        title: i18n.t('message.newcustomer'),
                    },
                    component: adduser,
                }, {
                    path: '/details',
                    name: 'details',
                    meta: {
                        islogin: true,
                        title: i18n.t('replenished.hint15'),
                    },
                    component: details,
                }, {
                    path: '/activateddetails',
                    name: 'activateddetails',
                    meta: {
                        islogin: true,
                        title: i18n.t('replenished.hint16'),
                    },
                    component: activateddetails,
                }, {
                    path: '/changepassword',
                    name: 'changepassword',
                    meta: {
                        islogin: true,
                        title: i18n.t('title.changepassword'),
                    },
                    component: changepassword,
                }, {
                    path: '/changeuser',
                    name: 'changeuser',
                    meta: {
                        islogin: true,
                        title: i18n.t('message.change') + i18n.t('message.user'),
                    },
                    component: changeuser,
                }, {
                    path: '/commissionib',
                    name: 'commissionib',
                    meta: {
                        islogin: true,
                        title: i18n.t('title.MyEarnings'),
                    },
                    component: commissionib,
                }, {
                    path: '/upload',
                    name: 'upload',
                    meta: {
                        islogin: true,
                        title: i18n.t('leftlist.title8'),
                    },
                    component: upload,
                }, {
                    path: '/Information',
                    name: 'Information',
                    meta: {
                        islogin: true,
                        title: i18n.t('upload.hint8'),
                    },
                    component: Information,
                }, {
                    path: '/logMessage',
                    name: 'logMessage',
                    meta: {
                        islogin: true,
                        title: i18n.t('leftlist.title7'),
                    },
                    component: logMessage,
                }, {
                    path: '/accountdetails',
                    name: 'accountdetails',
                    meta: {
                        islogin: true,
                        title: i18n.t('message.Paymentdetails'),
                    },
                    component: accountdetails,
                }
            ]
        },
        {
            path: '/login',
            component: () =>
                import ( /* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录', islogin: false }
        },
        {
            path: '*',
            redirect: '/404'
        }, {
            path: '/register',
            name: 'register',
            meta: {
                islogin: false
            },
            component: register,
        },
        // {
        //   path: '/',
        //   name: 'HelloWorld',
        //   component: HelloWorld,
        //   children: [
        // ]
        // }
    ]
});