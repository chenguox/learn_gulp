const { src, dest, watch } = require('gulp')

const babel = require('gulp-babel')
// const uglify = require('gulp-uglify')
const terser = require('gulp-terser')

// 任务：将 main.js 文件，使用babel预设处理, 压缩
const jsTask = () => {
  // 从 src 中读取文件，输出到 dist 文件夹中
  return (
    src(['./src/main.js', './src/utils/*.js'])
      .pipe(babel({
        presets: ['@babel/preset-env']
      }))
      .pipe(terser({
        mangle: { toplevel: true }
      }))
      .pipe(dest('./dist'))
  )
}

watch("./src/**/*.js", jsTask)

module.exports = {
  jsTask
}

// 执行命令： npx gulp jsTask