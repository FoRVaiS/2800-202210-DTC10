const { userModel } = require('../models/user.model');

const fetchAllAccounts = async (req, res) => {
  const { uid } = req.session;

  const user = await userModel.findById(uid);

  if (!user?.roles.includes('admin')) return res.status(403).json({ success: false });

  const users = await userModel.find({}, { __v: 0 });

  res.status(200).json({
    success: true,
    users: users ?? {},
  });
};

const fetchUserById = async (req, res) => {
  const { id } = req.params;

  const [user] = await userModel.find({ _id: id });

  if (!user) return res.status(500).json({ 
    success: false, 
    data: {
      msg: 'User does not exist or could not be found.',
    },
  });

  res.status(200).json({
    success: true,
    data: {
      _id: id,
      email: user.email,
      age: user.age,
      gender: user.gender,
      roles: user.roles,
    },
  });
};

const register = async (req, res) => {
  // TODO: Administrators need a special sign-up process, perhaps an admin token could be supplied with the request?
  const { email, password, age, gender } = req.body;

  const user = new userModel({ 
    email,
    password,
    age,
    gender,
    roles: ['member']
  });

  await user.save();

  res.status(200).json({
    success: true,
    msg: 'Account successfully created.',
    roles: ['member'],
  });
}

const login = async (req, res) => {
  const { email, password } = req.body;

  const [user] = await userModel.find({ email });

  if (user && user.password === password) {
    req.session.isAuthenticated = true;
    req.session.uid = user._id;

    res.status(200).json({
      data: {
        msg: 'Login successful!',
        uid: user._id,
      },
      success: true,
    });
  } else {
    res.status(200).json({
      msg: 'Could not find account.',
      success: false,
    });
  }
};

const logout = (req, res) => {
  req.session.isAuthenticated = false;
  req.session.uid = null;

  res.status(200).json({
    msg: 'User has been logged out',
    success: true,
  });
};

const renderLoginPage = (req, res) => {
  res.render('pages/login/login.ejs');
};

const renderRegistrationPage = (req, res) => {
  res.render('pages/register/register.ejs');
};

module.exports = { fetchAllAccounts, fetchUserById, login, logout, register, renderLoginPage, renderRegistrationPage };
