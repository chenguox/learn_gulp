https://v3.gulpjs.com.cn/docs/
const { series } = require('gulp')

// 1. 串行执行任务
const task1 = (cb) => {
  setTimeout(() => {
    console.log('task1')
    cb()
  }, 2000)
}

const task2 = (cb) => {
  setTimeout(() => {
    console.log('task2')
    cb()
  }, 2000)
}
const task3 = (cb) => {
  setTimeout(() => {
    console.log('task3')
    cb()
  }, 2000)
}

// 参数可选
const seriesTask = series(task1, task2, task3)

module.exports = {
  seriesTask,
}