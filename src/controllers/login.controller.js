const data = require('../__database__');

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

const loginPostController = (req, res) => {
  const { username, password } = req.body;

  // Get the first user that has a matching username
  const user = data.users.filter(user => user.username === username)[0];

  if (user && user.password === password) {
    req.session.isAuthenticated = true;
    req.session.userUid = user.uid;

    res.status(200).json(successReponse);
  } else {
    res.status(200).json(failureResponse);
  }
};

module.exports = { loginGetController, loginPostController };
