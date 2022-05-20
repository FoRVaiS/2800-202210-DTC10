const express = require('express');

// Controllers
const HomeController = require('../controllers/home.controller');
const UserController = require('../controllers/accounts.controller');

const router = express.Router();

router.get('/', HomeController.renderHomePage);
router.get('/register', UserController.renderRegistrationPage);
router.get('/login', UserController.renderLoginPage);

module.exports = { router };
