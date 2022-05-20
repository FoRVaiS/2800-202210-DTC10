const express = require('express');

// Controllers
const HomeController = require('../controllers/home.controller');
const UserController = require('../controllers/accounts.controller');
const EasterController = require('../controllers/easter.controller');

const router = express.Router();

router.get('/', HomeController.renderHomePage);
router.get('/easter-egg', EasterController.renderEasterEggPage);
router.get('/register', UserController.renderRegistrationPage);
router.get('/login', UserController.renderLoginPage);

module.exports = { router };
