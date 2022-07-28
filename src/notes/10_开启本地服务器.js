// 安装 browser-sync
// npm install browser-sync -D

const { series } = require('gulp')
// 开启一个本地服务，监听文件的改变自动重新执行任务
const browserSync = require('browser-sync')

// 搭建本地服务器
const bs = browserSync.create()
const serve = () => {
  // 监听 src 目录下 html 文件变化，执行任务 htmlTask 和 injectHtmlTask
  watch('./src/*.html', series(htmlTask,injectHtmlTask))
  watch('./src/js/*.js', series(jsTask,injectHtmlTask))
  watch('./src/css/*.less', series(cssTask,injectHtmlTask))

  bs.init({
    port: 8080,
    open: true,
    files: './dist/*',
    server: {
      baseDir: './dist',
    }
  })
}

const buildTask = series(jsTask, cssTask, htmlTask, injectHtmlTask)

module.exports = {
  buildTask
}