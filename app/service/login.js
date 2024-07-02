const UserModal = require('../model/user')
const UserService = require('../service/user')
const LoginBase = require('./base')

class LoginService extends LoginBase {
  /**
   * 处理登录
   * @param ctx
   * @returns {Promise<void>}
   */
  async login(ctx) {
    const { username, password } = ctx.request.body
    let jwtToken = null

    // 查询当前用户名对应用户是否存在
    const selectUser = await UserModal.findOne({ username })
    if (selectUser === null) {
      await UserService.handleCreateUser(username, password)
      // 颁发新的token
      jwtToken = await _common.createJWTToken(username)
      await this.setUserTokenToRedis(jwtToken, 'valid')
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

      const validToken = await this.getUserTokenFromRedis(ctx.jwtToken)
      // 查询缓存中用户之前颁布的token是否失效。
      // 失效重新颁布，没失效返回缓存的token。
      if (!validToken) {
        // 颁发新的token
        jwtToken = await _common.createJWTToken(username)
        await this.setUserTokenToRedis(jwtToken, 'valid')
      } else {
        jwtToken = validToken
      }
    }

    ctx.json({
      data: {
        username,
        token: jwtToken
      }
    })
  }

  /**
   * 处理注销，并失效redis缓存值
   * @param ctx
   * @returns {Promise<void>}
   */
  async logout(ctx) {
    await this.delUserRedisToken(ctx.jwtToken)
    ctx.jwtToken = null
    ctx.json({
      data: null
    })
  }
}

module.exports = new LoginService()
