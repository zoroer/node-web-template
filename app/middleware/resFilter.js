const CommonConf = require('../../conf/index')

// 请求日志记录
const handleReqLog = async (ctx, next) => {
  ctx.__request_time__ = Date.now()
  await next()
  ctx.__response_time__ = Date.now()
  const appLog = CommonConf.customLogger.appLogger.formatter(ctx)
  _common.AppLogger.info(appLog)
}

/**
 * 统一处理业务接口返回
 * params业务返回参数
 *  code 默认不传或等于1为请求成功，否则为请求失败
 *  data 返回数据，默认null
 *  msg  返回信息
 *  errLog 错误具体信息，仅供打点使用
 */
const handleResponse = async (ctx, next) => {
  // ctx.json方法，拦截返回数据
  ctx.json = async (params) => {
    const { code = 1, data = null, msg, errLog } = params
    if (code === 1 || code === 200) {
      // 请求成功响应
      params = {
        code: code,
        msg: msg || 'success',
        data,
        stime: new Date().getTime()
      }
    } else {
      // 请求失败响应
      params = {
        code: code,
        msg: (msg instanceof Error ? `${msg}` : msg) || 'failed',
        data,
        stime: new Date().getTime()
      }
      // 处理错误日志写入
      _common.WebLogger.error(msg || '[BAD_REQUEST]', errLog);
    }
    ctx.body = params
  }
  await next()
}

module.exports = { handleReqLog, handleResponse }
