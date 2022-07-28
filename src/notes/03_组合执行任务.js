const { series, parallel } = require('gulp')

// 1. 并行执行任务
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
const parallelTask = parallel(task1, task2, task3)
// 组合,把这两个串行起来
const composeTask = series(parallelTask, seriesTask)

module.exports = {
  composeTask,
}