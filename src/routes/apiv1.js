

const express = require('express');

// Controllers
const UserController = require('../controllers/accounts.controller');
const ReportController = require('../controllers/report.controller');

const router = express.Router();

// Report
router.get('/report', ReportController.fetchAllReports);
router.post('/report', ReportController.submitReport);

// User
router.get('/user', UserController.fetchAllAccounts);
router.post('/user/login', UserController.login);
router.post('/user/logout', UserController.logout);
router.post('/user/register', UserController.register);

module.exports = { router };
