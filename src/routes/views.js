const express = require('express');

// Controllers
const HomeController = require('../controllers/home.controller');
const UserController = require('../controllers/user.controller');
const SearchController = require('../controllers/search.controller')
const EasterController = require('../controllers/easter.controller');

const router = express.Router();

router.get('/', HomeController.renderHomePage);
router.get('/easter-egg', EasterController.renderEasterEggPage);
router.get('/register', UserController.renderRegistrationPage);
router.get('/login', UserController.renderLoginPage);
router.get('/admin', UserController.renderAdminPage);
router.get('/search', SearchController.renderSearchPage);

module.exports = { router };
