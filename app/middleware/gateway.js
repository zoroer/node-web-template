
// 处理请求跨域
const handleCros = async (ctx, next) => {
  const { origin, Origin, referer, Referer } = ctx.headers;
  const allowOrigin = origin || Origin || referer || Referer || '*';
  ctx.set("Access-Control-Allow-Origin", allowOrigin);
	ctx.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  ctx.set("Access-Control-Allow-Credentials", true);
	ctx.set("X-Powered-By", 'Express');

	if (ctx.method === 'OPTIONS') {
  	ctx.body = 200
	} else {
    await next();
	}
}

// jwt token验证并拦截校验
const handleSession = async (ctx, next) => {
  const { url } = ctx.req
  const { authorization } = ctx.headers
  const jwtToken = authorization?.split(' ')[1] || null
  let verifiedJWTToken = false //jwtToken验证结果

  // 拦截并获取 jwt token，放置全局使用
  if (jwtToken !== null) {
    ctx.jwtToken = jwtToken
    verifiedJWTToken = await _common.validateJWTToken(jwtToken)
  }

  // 验证auth接口的jwt token有效性，无效直接拦截并返回
  if (
    url.includes('/auth/') &&
    (jwtToken === null || !verifiedJWTToken)
  ) {
    ctx.json({
      code: 10002,
      data: null,
      msg: '[Illegal Token]'
    })
    return
  }

  // API格式未区分auth时，打印warning日志
  if (!/(\/auth\/)|(\/noauth\/)/.test(url)) {
    _common.AppLogger.warn('[BAD_API_FORMAT]', Error(url))
  }
  await next()
}

module.exports  = { handleCros, handleSession }
