const { userModel } = require('../models/user.model');

const successReponse = {
  msg: 'Login successful!',
  success: true,
};

const failureResponse = {
  msg: 'Could not find account.',
  success: false,
};

const loginGetController = (req, res) => {
  res.render('pages/login/login.ejs');
};

const loginPostController = async (req, res) => {
  const { email, password } = req.body;

  const [user] = await userModel.find({ email });

  if (user && user.password === password) {
    req.session.isAuthenticated = true;
    req.session.uid = user._id;

    res.status(200).json(successReponse);
  } else {
    res.status(200).json(failureResponse);
  }
};

module.exports = { loginGetController, loginPostController };
