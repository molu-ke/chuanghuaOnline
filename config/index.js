// 项目配置文件


/**
 *  当前环境变量，并非模式
 *  反向代理      proxy
 *  开发环境      development    npm run dev   or  npm run development
 *  测试环境      test           npm run test
 *  生产环境      production     npm run build
 */
let env = 'development'

// 项目服务器地址配置
let server = {
    proxy: "/api",
    development: "http://47.115.150.19/platformadmin/api/v1/",
    test: "https://simstest.xixi.top/platformadmin/api/v1/",
    production: "https://sims.xixi.top/platformadmin/api/v1/",
};




export default {
    env,
    url:server[env]
}