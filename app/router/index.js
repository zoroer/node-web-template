// testRouter 路由模块
const Router = require('@koa/router')
const router = new Router()

const testRouter  = require('./test')
const loginRouter  = require('./login')
const userRouter  = require('./user')

// 默认访问
router.get('/', (ctx, next) => {
  ctx.body = {
    name: 'this is home page'
  }
})

router.use(testRouter.routes())
router.use(loginRouter.routes())
router.use(userRouter.routes())

module.exports = router
