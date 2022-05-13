const { userModel } = require('../models/user.model');

const fetchAccountsPostController = async (req, res) => {
  const { uid } = req.session;

  const user = await userModel.findById(uid);

  if (!user?.roles.includes("admin"))
    return res.status(403).json({ success: false });

  res.status(200).json({
    success: true,
    users: data?.users ?? {},
  });
};

module.exports = { fetchAccountsPostController };
