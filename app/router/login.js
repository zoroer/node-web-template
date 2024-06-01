
const Router = require('@koa/router')
const router = new Router()

const LoginController = require('../controller/login')

// 登录、注册相关接口
router.post('/noauth/login', ctx => LoginController.login(ctx))
router.post('/auth/logout', ctx => LoginController.logout(ctx))

module.exports = router
