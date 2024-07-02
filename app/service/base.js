const { userTokenValidPreKey } = require('../redis-prekey')

class LoginBase {
  constructor() {
    this.userTokenValidPreKey = userTokenValidPreKey
  }

  // 设置jwt token已下发状态
  setUserTokenToRedis(token, data) {
    const { RedisInstance } = _common
    try {
      // 标准的id格式 userTokenValidPreKey = `user:token:valid:${token}`
      const userTokenValidPreKey = `${this.userTokenValidPreKey.key}:${token}`

      // 添加并设置过期时间
      return RedisInstance.set(userTokenValidPreKey, data, this.userTokenValidPreKey.expireTime)
    } catch (err) {
      console.log(err)
      return err
    }
  }

  // 获取jwt token已下发状态
  async getUserTokenFromRedis (u_id) {
    const { RedisInstance } = _common
    return Promise.resolve().then(async () => {
      const userTokenValidPreKey = `${this.userTokenValidPreKey.key}:${u_id}`

      const userTokenValid = await RedisInstance.get(userTokenValidPreKey)
      return userTokenValid || null
    })
  }

  // 删除jwt token已下发状态
  async delUserRedisToken (u_id) {
    const { RedisInstance } = _common
    return Promise.resolve().then(async () => {
      const userTokenValidPreKey = `${this.userTokenValidPreKey.key}:${u_id}`
      return await RedisInstance.del(userTokenValidPreKey)
    })
  }

  async createJWTToken
}

module.exports = LoginBase


