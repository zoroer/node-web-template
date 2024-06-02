const LoginService = require('../service/login')

class LoginController {
  constructor() {
    this.name = 'test_hello_world'
  }

  // 登录
  async login (ctx) {
    try {
      _common.validate({
        username: 'string',
        password: 'string'
      }, ctx)
    } catch (err) {
      ctx.json({
        code: 10001,
        msg: '[Request Params Error]',
        errLog: err,
      })
      return false
    }
    await LoginService.login(ctx)
  }

  // 注销
  async logout (ctx) {
    try {
      _common.validate({
        username: 'string'
      }, ctx)
    } catch (err) {
      ctx.json({
        code: 10001,
        msg: '[Request Params Error]',
        errLog: err,
      })
      return false
    }
    await LoginService.logout(ctx)
  }
}

module.exports = new LoginController()
