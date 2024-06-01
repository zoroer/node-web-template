const Parameter = require('parameter');
const jsonwebtoken = require('jsonwebtoken')
const { jwtConf } = require('../../conf/index')

// 处理时间格式
Date.prototype.formatTime = formatTime;
function formatTime (fmt) {
  let o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
        ? (o[k])
        : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

// 验证请求参数
function validate (rule={}, req) {
  const data = req.method === 'GET' ? req.query : req.request.body
  const validateResult = new Parameter().validate(rule, data)
  if (validateResult !== undefined) {
    throw new Error(JSON.stringify(validateResult))
  }
}

/**
 * 生成jwt token
 * @param username
 * @returns {Promise<*|null>}
 */
async function createJWTToken (username) {
  const token = await jsonwebtoken.sign({
    data: { username }
  }, jwtConf.secret, ...jwtConf.extraConf)
  return token || null
}

/**
 * 验证jwt token
 * @param token
 * @returns {Promise<*>}
 */
async function validateJWTToken (token) {
  try {
    const jwtVerifyRes = await jsonwebtoken.verify(token, jwtConf.secret)
    console.log('=>(index.js:59) jwtVerifyRes', jwtVerifyRes)
    if (jwtVerifyRes.err) {
      _common.AppLogger.warn('[JWT Token 验证失败]', jwtVerifyRes.err)
      return false
    }
    return true
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  validate,
  createJWTToken,
  validateJWTToken,
}
