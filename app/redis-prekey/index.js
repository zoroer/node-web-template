// 存储所有redis的key前置值，便于维护全站redis结构
const { commonTokenExpress } = require('../../conf/index')

// User
const userTokenValidPreKey = {
  key: 'user:token',
  expireTime: commonTokenExpress
}

module.exports = {
  userTokenValidPreKey,
}
