var path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 返回一个对象，这个对象中就包含当前前用户自定义的配置
module.exports = {
    // 入口：指定你想打包转换哪一个文件？源文件
    entry: './src/app.js',
    // 输出
    output: {
        // path:打包构建目标文件的目录
        path: path.join(__dirname, "dist"),
        // filename:打包构建目标文件的文件名
        filename: 'main.js'
    }
}