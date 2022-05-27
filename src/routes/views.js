const express = require('express');

// Controllers
const HomeController = require('../controllers/home.controller');
const UserController = require('../controllers/user.controller');
const SearchController = require('../controllers/search.controller')
const EasterController = require('../controllers/easter.controller');
const FormController = require('../controllers/form.controller');
const AboutUsController = require('../controllers/aboutus.controller');

const { requireAuthentication } = require('../middleware/requireAuthentication');
const { requireRole } = require('../middleware/requireRole');

const router = express.Router();

router.get('/', requireAuthentication, HomeController.renderHomePage);
router.get('/easter-egg', requireAuthentication, EasterController.renderEasterEggPage);
router.get('/register', UserController.renderRegistrationPage);
router.get('/login', UserController.renderLoginPage);
router.get('/admin', requireAuthentication, requireRole('admin'), UserController.renderAdminPage);
router.get('/search', requireAuthentication, SearchController.renderSearchPage);
router.get('/about-us', requireAuthentication, AboutUsController.renderAboutUsPage);
router.get('/form/salary', requireAuthentication, FormController.renderSalarySubmissionPage);

module.exports = { router };
