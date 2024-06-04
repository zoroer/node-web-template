const UserModal = require('../model/user')

class UserService {
  constructor() {
    this.dbSearchFilter = '-__v -_id -password'
  }

  // 工具方法 - 获取用户信息
  async handleGetUserInfo (ctx) {
    const { jwtToken = null } = ctx
    if (jwtToken === null) {
      throw new Error('token不能为空，请先登录！')
    }

    const verifyRes = await _common.validateJWTToken(jwtToken)
    if (verifyRes.err) {
      throw new Error('token无效！')
    }

    try {
      return await UserModal.findOne({ username: verifyRes.data.username }, this.dbSearchFilter)
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * 工具方法 - 创建user
   * @param username
   * @param password
   * @returns {Promise<{password: (*|void), username}>}
   */
  async handleCreateUser (username, password) {
    try {
      return await UserModal.create({
        username,
        password
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  // 获取用户信息
  async getUserInfo (ctx) {
    try {
      const res = await this.handleGetUserInfo(ctx)
      ctx.json({
        data: res
      })
    } catch (err) {
      ctx.json({
        code: 20002,
        data: null,
        msg: '获取用户信息失败'
      })
    }
  }

  // 获取用户信息
  async getUserList (ctx) {
    try {
      const resList = await UserModal.find({}, this.dbSearchFilter).lean(true) || []
      ctx.json({
        data: {
          list: resList
        }
      })
    } catch (err) {
      ctx.json({
        code: 20002,
        data: null,
        msg: '获取用户列表失败'
      })
    }
  }
}

module.exports = new UserService()
