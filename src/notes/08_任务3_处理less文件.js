// 安装插件 gulp-less,这个插件会帮我处理less文件，安装这个插件会帮我们安装less
// npm install gulp-less -D

// 安装插件 gulp-postcss ,不会帮我们安装postcss ,所以需要格外安装postcss,同时要安装预设
// npm install gulp-postcss -D
// npm install postcss -D
// npm install postcss-preset-env -D

const { src, dest } = require('gulp')

const less = require('gulp-less')
const postcss = require('gulp-postcss')
const prostcssPresetEnv = require('postcss-preset-env')

// 创建一个处理 less 和 css 的任务
const lessTask = () => {
  return src('./src/css/*.less',{ base: './src' })
    .pipe(less())
    .pipe(postcss([prostcssPresetEnv()]))
    .pipe(dest('./dist'))
}

module.exports = {
  lessTask
}