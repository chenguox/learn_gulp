// 清空  npm install del -D

const {
  src,
  dest,
  series,
  watch,
  parallel
} = require('gulp')

const del = require('del')

const babel = require('gulp-babel')
const terser = require('gulp-terser')

const less = require('gulp-less')
const postcss = require('gulp-postcss')
const postcssPresetEnv = require('postcss-preset-env')

const htmlMin = require('gulp-htmlmin')

const inject = require('gulp-inject')

// 开启一个本地服务，监听文件的改变自动重新执行任务
const browserSync = require('browser-sync')

const clean = () => {
  return del(['dist'])
}

const jsTask = () => {
  return src('./src/js/*.js', {
      base: './src'
    })
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

// 搭建本地服务器
const bs = browserSync.create()
const serve = () => {
  // 监听 src 目录下 html 文件变化，执行任务 htmlTask 和 injectHtmlTask
  watch('./src/*.html', series(htmlTask, injectHtmlTask))
  watch('./src/js/*.js', series(jsTask, injectHtmlTask))
  watch('./src/css/*.less', series(cssTask, injectHtmlTask))

  bs.init({
    port: 8080,
    open: true,
    files: './dist/*',
    server: {
      baseDir: './dist',
    }
  })
}

const buildTask = series(parallel(jsTask, cssTask, htmlTask), injectHtmlTask)

const serveTask = series(buildTask, serve)

module.exports = {
  serveTask,
  buildTask
}