const TEXT = {
    en: {
        h: "New Year's Trading arrangements Reminder",
        p1: "For New Year's Holiday, some markets will be closed, please refer to our notice in your mailbox for more information.",
        p2: "On behalf of NAG Markets, we wish you a Happy New Year!"
    },
    zhHk: {
        h: "元旦交易安排提醒",
        p1: "由于元旦假期，一些交易产品将会停盘。我们已将通知发送到您注册邮箱。请查阅详细信息。",
        p2: "NAG Markets 在此祝您元旦快樂"
    }
}
const lang = sessionStorage.localeLanguage || 'en'
export default TEXT[lang];