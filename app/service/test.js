const testModal = require('../model/test')

class MVCTestService {
  async showMVCTest(ctx) {
    const query = await testModal.find({}, { _id: 0, __v: 0 }).lean(true)
    if (!query.length) {
      const model = new testModal({ voteNum: 10000 });
      const saveData = await model.save();
      ctx.json({
        data: saveData
      })
    }
    ctx.json({
      data: query[0]
    })
  }
}

module.exports = new MVCTestService()
