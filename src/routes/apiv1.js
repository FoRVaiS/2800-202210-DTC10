const express = require('express');

// Controllers
const UserController = require('../controllers/user.controller');
const ReportController = require('../controllers/report.controller');
const SalaryController = require('../controllers/salary.controller');

const router = express.Router();

// All of these routes are prepended by /api/v1
// For example, if you want to fetch all reports
// You would query the "/api/v1/report" GET endpoint

// Report
router.get('/report', ReportController.fetchAllReports);
router.post('/report/post', ReportController.submitReport);

// User
router.get('/user', UserController.fetchAllAccounts);
router.get('/user/id/:id', UserController.fetchUserById);
router.get('/user/logout', UserController.logout);
router.post('/user/login', UserController.login);
router.post('/user/register', UserController.register);

// Salary
router.get('/salary', SalaryController.fetchAllSalaries);
router.put('/salary', SalaryController.fetchSalaryFromLocation);
router.post('/salary/submit', SalaryController.submitSalary);

module.exports = { router };
