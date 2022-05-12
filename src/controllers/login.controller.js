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
  const { email, password } = req.body;

  // Get the first user that has a matching email
  const user = data.users.filter(user => user.email === email)[0];

  if (user && user.password === password) {
    req.session.isAuthenticated = true;
    req.session.uid = user.uid;

    res.status(200).json(successReponse);
  } else {
    res.status(200).json(failureResponse);
  }
};

module.exports = { loginGetController, loginPostController };
