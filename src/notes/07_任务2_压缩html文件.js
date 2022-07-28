// 安装 npm install gulp-htmlmin -D
const { src, dest } = require('gulp')

const htmlMin = require('gulp-htmlmin')

// 创建一个处理 html 折叠空格的任务
const htmlTask = () => {
  return src('./src/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('./dist'))
}

module.exports = {
  htmlTask
}