const { ReportModel } = require('../models/report.model');
const { createErrorPayload } = require('../utils/createErrorPayload');
const { createSuccessPayload } = require('../utils/createSuccessPayload');

const fetchAllReports = async (req, res) => {
  if (!req.session.isAuthenticated) res.status(403).json(createErrorPayload('User must be authenticated.'));

  const reports = await ReportModel.find();

  res.status(200).json(createSuccessPayload({ reports }));
}

const submitReport = async (req, res) => {
  const { postId } = req.body;

  if (!postId || !postId.match(/^\d+$/g)) return res.status(400).json(createErrorPayload('postId must be an integer'));

  const report = new ReportModel({ postId });

  await report.save();

  res.status(200).json(createSuccessPayload({ postId }));
};

module.exports = { submitReport, fetchAllReports };
