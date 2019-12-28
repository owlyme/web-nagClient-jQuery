import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
// import Bridge from '@/assets/common/js/bridge.js'
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/font.css';
import './components/common/directives';
import 'babel-polyfill';
import i18n from './i18n/i18.js'
import './assets/front/iconfont.css'
import api from './api/install'
// import Locale from 'element-ui/lib/locale'
Vue.config.productionTip = false;
// import enUS from 'element-ui/lib/locale/lang/en'
// import zhCN from 'element-ui/lib/locale/lang/zh-CN'
// import zhHk from 'element-ui/lib/locale/lang/zh-TW'
import VueClipboard from 'vue-clipboard2'
import 'vue-py'
Vue.use(VueClipboard)
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
// Vue.prototype.$bridge = Bridge
Vue.use(api)
Vue.config.productionTip = false
    // if (sessionStorage.getItem('localeLanguage') == 'zh') {
    //   Locale.use('en-US', zhCN);
    // } else if (sessionStorage.getItem('localeLanguage') == 'zhHk') {
    //   Locale.use('en-US', zhHk);
    // } else if (sessionStorage.getItem('localeLanguage') == 'en') {
    //   Locale.use('en-US', enUS);
    // }

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    if (to.query.lang == 'zh') {
        i18n.locale = 'zhHk'
        sessionStorage.localeLanguage = 'zhHk'
    }
    if (to.query.lang == 'en') {
        i18n.locale = 'en'
        sessionStorage.localeLanguage = 'en'
    }
    if (!sessionStorage.localeLanguage) {
        sessionStorage.localeLanguage = 'zhHk'
        i18n.locale = 'zhHk'
    }
    if (sessionStorage.info != undefined) {
        var approved = JSON.parse(sessionStorage.info).approved
        var info = JSON.parse(sessionStorage.info)
        if (info.idUploaded && info.infoFilled && !info.approved) {
            console.log('審核中')
            if (to.path == "/adduser" ||
                to.path == "/Rulescommission" ||
                to.path == "/Toactivate" ||
                to.path == "/Activated" ||
                to.path == "/commissionib" ||
                to.path == "/deposit" ||
                to.path == "/withdraw" ||
                to.path == "/accountdetails" ||
                to.path == "/transactionrecord"
            ) {
                vues.$notify({ type: 'warning', message: '您的資料正在審核中,請聯係服務人員' });
                return
            }
        }
        if (!info.infoFilled && !info.idUploaded) {
            console.log('資料未上傳')
            if (to.path == "/adduser" ||
                to.path == "/Rulescommission" ||
                to.path == "/Toactivate" ||
                to.path == "/Activated" ||
                to.path == "/commissionib" ||
                to.path == "/deposit" ||
                to.path == "/withdraw" ||
                to.path == "/accountdetails" ||
                to.path == "/transactionrecord"
            ) {
                vues.$notify({ type: 'warning', message: '您的資料尚未完善，請您繼續完善註冊信息' });
                return
            }

        }
        if (info.approveRejected) {
            console.log('資料駁回')
            if (to.path == "/adduser" ||
                to.path == "/Rulescommission" ||
                to.path == "/Toactivate" ||
                to.path == "/Activated" ||
                to.path == "/commissionib" ||
                to.path == "/deposit" ||
                to.path == "/withdraw" ||
                to.path == "/accountdetails" ||
                to.path == "/transactionrecord" ||
                to.path == '/addwithdraw'
            ) {
                vues.$notify({ type: 'warning', message: '您的資料目前暫未審核通過，請重新上傳' });
                return
            }

        }
        if (!approved) {
            console.log('資料駁回')
            if (to.path == "/adduser" ||
                to.path == "/Rulescommission" ||
                to.path == "/Toactivate" ||
                to.path == "/Activated" ||
                to.path == "/commissionib" ||
                to.path == "/deposit" ||
                to.path == "/withdraw" ||
                to.path == "/accountdetails" ||
                to.path == "/transactionrecord" ||
                to.path == '/addwithdraw'
            ) {
                vues.$notify({ type: 'warning', message: '您的資料尚未認證成功' });
                return
            }

        }
        // if (info.approveRejected) {
        //     console.log('資料駁回')
        //     // return
        // }
        // if(info.approved){
        //     console.log('資料通過')
        //     // return
        // }



        if (to.path == "/withdraw" && !approved) {

            vues.$notify({ type: 'warning', message: '您的資料尚未完善，請您繼續完善註冊信息' });
            return
        }
        if (to.path == "/deposit" && !approved) {
            vues.$notify({ type: 'warning', message: '您的資料尚未完善，請您繼續完善註冊信息' });
            return
        }
    }

    document.title = `${to.meta.title}`;
    const role = sessionStorage.getItem('token');
    if (!role && to.path !== '/login' && to.meta.islogin) {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

var vues = new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
export default vues