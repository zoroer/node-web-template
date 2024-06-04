const UserService = require('../service/user')

class UserController {
  // 获取当前登录用户详情
  async getUserInfo (ctx) {
    await UserService.getUserInfo(ctx)
  }
  // 获取所有用户列表
  async getUserList (ctx) {
    await UserService.getUserList(ctx)
  }
}

module.exports = new UserController()
