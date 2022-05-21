const { UserModel } = require('../models/user.model');
const { ReportModel } = require('../models/report.model');

const fetchAllReports = async (req, res) => {
  if (!req.session.isAuthenticated) res.status(403);

  //!BLOCKED: need to finalize user stucture.
  // const { uid } = req.session;

  // const user = UserModel.find({ uid });

  const reports = await ReportModel.find();

  res.status(200).json({ reports });
}

const submitReport = async (req, res) => {
  const { postId } = req.body;

  if (!postId || !postId.match(/^\d+$/g)) return res.status(400).json({
    success: false,
    msg: "postId must be an integer",
  });

  const report = new ReportModel({ postId });

  await report.save();

  res.status(200).json({ postId });
};

module.exports = { submitReport, fetchAllReports };
