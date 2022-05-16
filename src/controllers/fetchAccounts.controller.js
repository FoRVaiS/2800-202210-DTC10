const { userModel } = require('../models/user.model');

const fetchAccountsPostController = async (req, res) => {
  const { uid } = req.body;

  const user = await userModel.findById(uid);

  if (!user?.roles.includes("admin"))
    return res.status(403).json({ success: false });

  const users = await userModel.find({}, { __v: 0 });

  res.status(200).json({
    success: true,
    users: users ?? {},
  });
};

module.exports = { fetchAccountsPostController };
