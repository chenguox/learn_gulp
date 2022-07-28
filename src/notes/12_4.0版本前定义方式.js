const gulp = require('gulp')

gulp.task('bar',(cb)=>{
  console.log('bar')
  cb()
})

// 定义默认的任务
module.exports.default = (cb) => {
  console.log('default task')
  cb()
}