module.exports = {
    publicPath: './',
    outputDir: 'project',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "localhost",
        port: '8082',
        https: false,   //是否使用https协议
        hotOnly: true, //是否开启热更新
        proxy: {
            '/api': {
                target: 'http://47.110.33.227:8180', //API服务器的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    },
}	