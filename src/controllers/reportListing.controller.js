const { userModel } = require('../models/user.model');
const { reportModel } = require('../models/report.model');

const reportListingGetController = async (req, res) => {
  if (!req.session.isAuthenticated) res.status(403);

  //!BLOCKED: need to finalize user stucture.
  // const { uid } = req.session;

  // const user = userModel.find({ uid });

  const reports = await reportModel.find();

  res.status(200).json({ reports });
}

const reportListingPostController = async (req, res) => {
  const { postId } = req.body;

  if (!postId || !postId.match(/^\d+$/g)) return res.status(400).json({
    success: false,
    msg: "postId must be an integer",
  });

  const report = new reportModel({ postId });

  await report.save();

  res.status(200).json({ postId });
};

module.exports = { reportListingPostController, reportListingGetController };
