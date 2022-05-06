const logoutPostController = (req, res) => {
  req.session.isAuthenticated = false;
  req.session.uid = null;

  res.status(200).json({
    msg: 'User has been logged out',
    success: true,
  });
};

module.exports = { logoutPostController };
