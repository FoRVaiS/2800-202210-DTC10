const { UserModel } = require("../models/user.model");

const requireRole = (...roles) => async (req, res, next) => {
  const { uid, isAuthenticated } = req.session;

  if (isAuthenticated && uid) {
    const user = await UserModel.findById(uid);

    let hasRole = false;

    for (const role of roles) {
      if (user.roles.map(role => role.toLowerCase()).includes(role.toLowerCase())) {
        hasRole = true;
      }
    }

    if (hasRole) return next();
  }

  res.redirect('/');
}

module.exports = { requireRole };