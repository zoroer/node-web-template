// 加载全局方法
require('./app/global')

const Koa = require('koa');
const app = new Koa();

const RouterMap = require('./app/router/index')
const Middleware = require('./app/middleware')

// 加载数据库配置
require('./mongoDB/index')

// 加载中间件
Object.values(Middleware).map(middleware => {
  app.use(middleware)
})

// 加载路由模块
app.use(RouterMap.routes())

app.listen(3000, '0.0.0.0', () => {
  console.log(`Example app listening on port 3000`)
})
