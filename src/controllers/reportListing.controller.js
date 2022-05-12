const { reportModel } = require('../models/report.model');

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

module.exports = { reportListingPostController };
