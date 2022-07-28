# learn_gulp

gulp 的学习

**实现：对 mian.js 进行处理，并输入到 dist 文件夹，处理操作主要有：**

1. **ES6 转成 ES5, 可以使用 babel 插件**
2. **对代码进行压缩和丑化， 可以使用 uglify 或者 terser 插件**

**安装**

> **npm install gulp-babel -D**

> **babel 核心 和 预设**

> **npm install @babel/core -D**

> **npm install @babel/preset-env -D**

> **丑化**

> **npm install gulp-uglify -D**

> **npm install gulp-terser -D**

```
const { src, dest } = require('gulp')


const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const terser = require('gulp-terser')


const jsTask = () => {
  // 从src中读取文件, 输出到dist文件夹中
  return (
    src('./src/main.js')
      .pipe(babel({ presets: ['@babel/preset-env'] }))
      // .pipe(uglify())
      .pipe(terser({ mangle: { toplevel: true } }))
      .pipe(dest('./dist'))
  )
}


module.exports = {
  jsTask,
}
```
