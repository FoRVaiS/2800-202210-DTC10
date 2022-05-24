const { model, Schema } = require('mongoose');

const ReportSchema = new Schema({
  postId: String,
  reporterId: String
});

const ReportModel = model('report', ReportSchema);

module.exports = { ReportModel };
