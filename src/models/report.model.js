const { model, Schema } = require('mongoose');

const ReportSchema = new Schema({
  postId: Number,
});

const ReportModel = model('report', ReportSchema);

module.exports = { ReportModel };
