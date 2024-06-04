
const Router = require('@koa/router')
const router = new Router()

const UserController = require('../controller/user')

// 用户相关接口
router.post('/auth/getUserInfo', ctx => UserController.getUserInfo(ctx))
router.post('/auth/getUserList', ctx => UserController.getUserList(ctx))

module.exports = router
