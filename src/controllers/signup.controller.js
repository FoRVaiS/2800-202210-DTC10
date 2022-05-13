const { userModel } = require('../models/user.model');

const signUpGetController = (req, res) => {
  res.render('pages/register/register.ejs');
}

const signUpPostController = async (req, res) => {
  // TODO: Administrators need a special sign-up process, perhaps an admin token could be supplied with the request?
  const { email, password } = req.body;

  const user = new userModel({ email, password, roles: ['member'] });

  await user.save();

  res.status(200).json({
    success: true,
    msg: 'Account successfully created.',
    roles: ['member'],
  });
}

module.exports = { signUpPostController, signUpGetController };
