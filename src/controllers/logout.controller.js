const logoutPostController = (req, res) => {
  req.session.authenticated = false;

  res.status(200).json({
    msg: 'User has been logged out',
    success: true,
  });
}

module.exports = { logoutPostController };
