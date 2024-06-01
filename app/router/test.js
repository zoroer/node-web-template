const RouterModuleName = '/test'

const Router = require('@koa/router')
const router = new Router({
  prefix: RouterModuleName
})

const TestController = require('../controller/test')

// mvc结构demo
router.get('/mvcExample', ctx => TestController.mvcExample(ctx))

// get/post请求demo
router.get('/getQueryName', ctx => TestController.getQueryName(ctx))
router.post('/getBodyName', ctx => TestController.getPostName(ctx))

// get/post请求参数校验
router.get('/validateGetParameter', ctx => TestController.validateParameter(ctx))
router.post('/validatePostParameter', ctx => TestController.validateParameter(ctx))

module.exports = router
