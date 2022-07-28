// gulp 暴露了 src() 和 dest() 方法用于处理计算机上存放的文件。

// 获取 src 和 dest 
const { src, dest } = require('gulp')

// src 匹配一个文件
const task = () => {
  return (
    src('./src/main.js')
      .pipe(dest('./dist'))
  )
}
// src 匹配多个文件
const task = () => {
  return (
    src(['./src/main1.js', './src/main2.js'])
      .pipe(dest('./dist'))
  )
}

// 其他
// 例子： src('./src/*.js') 
// 匹配 src 目录下的所有js 文件
// 例子： src('./scripts/**/*.js')
// 匹配 scripts 目录下的所有文件夹下的所有js文件
// 例子： src(['./scripts/**/*.js', '!scripts/vendor/'])
// 取反


// base: 会把 ./src 作为基础文件，把匹配到该目录下的文件夹也复制过去
src('./src/js/**.js', { base: './src' })