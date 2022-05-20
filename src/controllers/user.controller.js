const { UserModel } = require('../models/user.model');
const { createErrorPayload } = require('../utils/createErrorPayload');
const { createSuccessPayload } = require('../utils/createSuccessPayload');

const fetchAllAccounts = async (req, res) => {
  const { uid } = req.session;

  const user = await UserModel.findById(uid);

  if (!user?.roles.includes('admin')) return res.status(403).json(createErrorPayload('User must be an admin to access this resource.'));

  const users = await UserModel.find({}, { __v: 0 });

  res.status(200).json(createSuccessPayload(users));
};

const fetchUserById = async (req, res) => {
  const { id } = req.params;

  const [user] = await UserModel.find({ _id: id });

  if (!user) return res.status(500).json(createErrorPayload('User does not exist or could not be found.'));

  res.status(200).json(createSuccessPayload({
    id: id,
    email: user.email,
    age: user.age,
    gender: user.gender,
    roles: user.roles,
  }));
};

const register = async (req, res) => {
  // TODO: Administrators need a special sign-up process, perhaps an admin token could be supplied with the request?
  const { email, password, age, gender } = req.body;

  const user = new UserModel({ 
    email,
    password,
    age,
    gender,
    roles: ['member']
  });

  await user.save();

  res.status(200).json(createSuccessPayload({
    msg: 'Account successfully created.',
    roles: ['member'],
  }));
}

const login = async (req, res) => {
  const { email, password } = req.body;

  const [user] = await UserModel.find({ email });

  if (user && user.password === password) {
    req.session.isAuthenticated = true;
    req.session.uid = user._id;

    res.status(200).json(createSuccessPayload({
      uid: user._id,
      msg: 'Login successful!',
    }));
  } else {
    res.status(400).json(createErrorPayload('Could not find account.'));
  }
};

const logout = (req, res) => {
  req.session.isAuthenticated = false;
  req.session.uid = null;

  res.status(200).json(createSuccessPayload({
    msg: 'User has been logged out'
  }));
};

const renderLoginPage = (req, res) => {
  res.render('pages/login/login.ejs');
};

const renderRegistrationPage = (req, res) => {
  res.render('pages/register/register.ejs');
};

module.exports = { fetchAllAccounts, fetchUserById, login, logout, register, renderLoginPage, renderRegistrationPage };
