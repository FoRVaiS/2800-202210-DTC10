const data = require('../__database__');

const successReponse = {
  msg: 'Login successful!',
  success: true,
}

const failureResponse = {
  msg: 'Could not find account.',
  success: false,
}

const loginGetController = (req, res) => {
  res.render('pages/login/login.ejs');
};

const loginPostController = (req, res) => {
  const { username, password } = req.body;

  if (data.users[username].password === password) {
    req.session.isAuthenticated = true;

    res.status(200).json(successReponse);
  } else {
    res.status(200).json(failureResponse);
  }
};

module.exports = { loginGetController, loginPostController };
