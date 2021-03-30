const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
const Timestamp = new Date().getTime();
module.exports = {
    outputDir: 'dist', // build输出目录
    assetsDir: 'assets', // 静态资源目录（js, css, img）
    lintOnSave: false, // 是否开启eslint
    publicPath: './',
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
            filename: `js/[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
            chunkFilename: `js/[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
        },
    }
}