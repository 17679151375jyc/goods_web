const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    //打包配置
    publicPath:'/',
    outputDir: './dist/goods_web',
    assetsDir:'static',

    // 本地启动配置
    devServer: {
        // 自动打开
        open: false,  
        // host: '192.168.2.13',  
        // host: 'localhost',
        // port: 8080,  
        https: false,  
        hotOnly: false,  
        proxy: {
            '/': {    // search为转发路径
                // target: 'http://ipzdmx.natappfree.cc/',  // 目标地址
                target: "http://49.234.22.146:8077/",
                ws: true, // 是否代理websockets
                changeOrigin: true   // 设置同源  默认false
            }
        }
    },
    lintOnSave: true,
}