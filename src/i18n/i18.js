import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './lang/zh'
import en from './lang/en'
import zhHk from './lang/zh-hk'
// import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import zhHkLocale from 'element-ui/lib/locale/lang/zh-TW'
Vue.use(VueI18n)


// console.log(messages.zh)

// const i18n = new VueI18n({
//   locale: sessionStorage.getItem('locale') || 'zh',
//   messages 
// })



const DEFAULT_LANG = s
const LOCALE_KEY = 'localeLanguage'
// const s = sessionStorage.getItem(LOCALE_KEY)?sessionStorage.getItem(LOCALE_KEY):(new Intl.NumberFormat()).resolvedOptions().locale



const s = sessionStorage.getItem(LOCALE_KEY)?sessionStorage.getItem(LOCALE_KEY):'zhHk'
// const locales = {
//   zh: require('./zh.json'),
//   en: require('./en.json'),
// }
const messages = {
    en: Object.assign(en, enLocale),
    zhHk: Object.assign(zhHk, zhHkLocale),
    zh: Object.assign(zh, zhLocale)
  }
  
const i18n = new VueI18n({
  locale: DEFAULT_LANG,
  messages,
})
//这里我们抛出一个setup方法，用来修改我们的语言；
//并且在这个方法中，我们把用户选择的语言存储在sessionStorage里面，方便用户下次进入是直接使用上次选择的语言
//因为语言的不同，可能我们页面上的样式也会有相应的调整，所以这里在body上加入了相应的类名，方便我们做样式定制
export const setup = lang => {
  if (lang === undefined) {
    lang = window.sessionStorage.getItem(LOCALE_KEY)
    if (messages[lang] === undefined) {
      lang = DEFAULT_LANG
    }
  }
  window.sessionStorage.setItem(LOCALE_KEY, lang)

  Object.keys(messages).forEach(lang => {
    document.body.classList.remove(`lang-${lang}`)
  })
  document.body.classList.add(`lang-${lang}`)
  document.body.setAttribute('lang', lang)
//把当前语言设置到vue的配置里面，方便在代码中读取
  Vue.config.lang = lang
  i18n.locale = lang
}
//设置默认语言为中文
setup(s)
//把i18n绑定到window上，方便我们在vue以外的文件使用语言包
window.i18n = i18n;
// console.log(locale.i18n((key, value) => i18n.t(key, value)))
// locale.i18n((key, value) => i18n.t(key, value)) 


export default i18n