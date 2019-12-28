let baseUrl = '/api' // 本地代理

switch (process.env.NODE_ENV) {
    case 'dev':
        baseUrl = 'http://192.168.4.209:8080/v2/api-docs' // 测试环境url
        // baseUrl = 'http://testserver.feleti.cn/' // 测试环境url
        break
    case 'pre':
        baseUrl = 'https://pre-server.feleti.cn' // 预上线环境url
        break
    case 'production':
        baseUrl = 'https://app_api.xunbaowang.net' // 生产环境url
        break
}

export default baseUrl