const UserModal = require('../model/user')
const UserService = require('../service/user')

class LoginService {
  /**
   * 处理登录
   * @param ctx
   * @returns {Promise<void>}
   */
  async login(ctx) {
    const { username, password } = ctx.request.body
    let jwtToken = null

    const selectUser = await UserModal.findOne({ username })
    if (selectUser === null) {
      await UserService.handleCreateUser(username, password)
    } else {
      // 账号，密码有误
      if (password !== selectUser.password) {
        ctx.json({
          code: 20001,
          data: null,
          msg: '用户名/密码错误，请重试！'
        })
        return
      }
    }
    // 颁发新的token
    // todo 需要接入redis优化多个有效token的问题。
    jwtToken = await _common.createJWTToken(username)

    ctx.json({
      data: {
        username,
        token: jwtToken
      }
    })
  }

  /**
   * 处理注销
   * todo 需要接入redis让已经颁发的token失效。
   * @param ctx
   * @returns {Promise<void>}
   */
  async logout(ctx) {
    const {username} = ctx.request.body
    ctx.jwtToken = null

    ctx.json({
      data: {
        username
      }
    })
  }
}

module.exports = new LoginService()
