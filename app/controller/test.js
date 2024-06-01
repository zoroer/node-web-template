const MVCTestService = require('../service/test')

class TestController {
  constructor() {
    this.name = 'test_hello_world'
  }

  // get test
  getQueryName (ctx) {
    ctx.json({
      data: {
        name: ctx.query.name
      }
    })
  }

  // post test
  getPostName (ctx) {
    ctx.json({
      data: {
        body: ctx.request.body
      }
    })
  }

  // 请求验证
  validateParameter (ctx) {
    try {
      _common.validate({
        name: 'string',
      }, ctx)
    } catch (err) {
      ctx.json({
        code: 10001,
        msg: '[Request Params Error]',
        errLog: err,
      })
      return false
    }
    ctx.json({
      data: this.name
    })
  }

  //  mvc数据路调用流程
  async mvcExample (ctx) {
    await MVCTestService.showMVCTest(ctx)
  }
}

module.exports = new TestController()
