const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// 引入自增id插件
const AutoEnhanceIndexPlugin = require('../plugin/autoEnhanceIndex')

const TestSchema = new Schema({
  // 点赞数
  voteNum: {
    type: Number,
  },
});

// 注册插件
TestSchema.plugin(AutoEnhanceIndexPlugin, { model: 'test', field: 'id' })
module.exports = mongoose.model('comment', TestSchema, 'test');
