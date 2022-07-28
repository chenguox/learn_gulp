// 创建一系列的任务，串行的执行：
// 处理js任务
// 处理css任务
// 处理html任务
// 自动往html引入js/css文件

// 处理我们我们的 js 和 css, 我们需要把文件引入到 html 中，自己手动引入是很麻烦的，这里我们可以使用一个html资源注入插件： gulp-inject 
// 安装 npm install gulp-inject -D

const {
  src,
  dest,
  series
} = require('gulp')

const babel = require('gulp-babel')
const terser = require('gulp-terser')

const less = require('gulp-less')
const postcss = require('gulp-postcss')
const postcssPresetEnv = require('postcss-preset-env')

const htmlMin = require('gulp-htmlmin')

const inject = require('gulp-inject')

const jsTask = () => {
  return src('./src/js/*.js', { base: './src' })
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(terser({
      mangle: {
        toplevel: true
      }
    }))
    .pipe(dest('./dist'))
}

const cssTask = () => {
  return src('./src/css/*.less', {
      base: './src'
    })
    .pipe(less())
    .pipe(postcss([postcssPresetEnv()]))
    .pipe(dest('./dist'))
}

const htmlTask = () => {
  return src('./src/index.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('./dist'))
}

const injectHtmlTask = () => {
  return src('./dist/*.html')
    .pipe(inject(
      src(['./dist/js/*.js', './dist/css/*.css']), {
        relative: true
      }))
    .pipe(dest('./dist'))
}

const buildTask = series(jsTask, cssTask, htmlTask, injectHtmlTask)

module.exports = {
  buildTask
}