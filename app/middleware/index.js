const { handleCros, handleSession } = require('./gateway')
const { bodyParser } = require("@koa/bodyparser");
const { handleReqLog, handleResponse } = require('./resFilter')

module.exports = {
  handleCros,
  bodyParser: bodyParser(),
  // handleSession,
  handleReqLog,
  handleResponse
}
