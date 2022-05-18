

const express = require('express');

// Controllers
const UserController = require('../controllers/accounts.controller');
const ReportController = require('../controllers/report.controller');

const router = express.Router();

router.get('/report', ReportController.fetchAllReports);
router.get('/accounts', UserController.fetchAllAccounts);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.post('/reports', ReportController.submitReport);
router.post('/register', UserController.register);

module.exports = { router };
