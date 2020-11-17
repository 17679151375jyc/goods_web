const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    //打包配置
    publicPath:'',
    outputDir: './dist/goods_web',
    assetsDir:'static',

    // 本地启动配置
    devServer: {
        open: true,  
        // host: '192.168.2.13',  
        // host: 'localhost',
        port: 8080,  
        https: false,  
        hotOnly: false,  
        proxy: null,
    },
    // 自动打开
    lintOnSave: true,
}