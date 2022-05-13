const { model, Schema } = require('mongoose');

const reportSchema = new Schema({
  postId: Number,
});

const reportModel = model('report', reportSchema);

module.exports = { reportModel };
