const CommonConf = {}

CommonConf.jwtConf = {
  secret: '__node_web__',
  extraConf: {
    expiresIn: '1h'
  }
}

// mongoose配置
CommonConf.mongoose = {
  url: 'mongodb://127.0.0.1:28017/node-web',
  options: {
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
}

// logger配置
CommonConf.customLogger = {
  path: {
    web: './logs/web/',
    app: './logs/app/',
    db:  './logs/db/'
  },
  appLogger: {
    formatter(meta) {
      const startTime = meta.__request_time__
      const endTime = meta.__response_time__
      return JSON.stringify({
        timestamp: new Date().toLocaleString(),
        app: meta.app.name,
        level: '',
        thread: '',
        logger: '',
        class: '',
        line: '',
        req_id: '',
        req_url: meta.originalUrl,
        req_ip: meta.ip,
        req_body: meta.body,
        req_params: meta.query,
        req_method: meta.method,
        msg: meta.message,
        ex: '',
        startTime,
        during: endTime - startTime,
        paddingMessage: meta.paddingMessage,
      })
    }
  }
};

module.exports = CommonConf



