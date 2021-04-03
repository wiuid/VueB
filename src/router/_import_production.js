// 生产模式
module.exports = file => () => import('@/views/' + file + '.vue')
// 开发模式
// module.exports = file => require('@/views/' + file + '.vue').default
