const path = require('path');

const express = require('express');
const config = require('config');

// Express Middleware
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');

// Controllers
const HomeController = require('./controllers/home.controller');
const UserController = require('./controllers/accounts.controller');
const ReportController = require('./controllers/report.controller');

const webRoot = path.join(__dirname, '..', 'public');

// Creates a new express instance pre-loaded with middleware.
const createServer = () => {
  // Initialize an instance of express>
  const app = express();

  const secret = process.env.NODE_ENV === 'production' ? config.get('secret') : 'devsecret';

  // Inject middleware
  app.use(helmet());
  app.use(morgan('combined'));
  app.use(express.json());
  app.use(session({
    secret,
    resave: false,
    saveUninitialized: true,
  }));

  // Configure view settings
  app.set('views', path.join(__dirname, '..', 'public'));
  app.set('view engine', 'ejs');

  // Expose all files in the webRoot directory
  app.use(express.static(webRoot));

  mongoose.connect(config.get('mongo.connectionString'));

  app.get('/', HomeController.renderHomePage);
  app.get('/register', UserController.renderRegistrationPage);
  app.get('/login', UserController.renderLoginPage);
  app.get('/report', ReportController.fetchAllReports);
  app.get('/accounts', UserController.fetchAllAccounts);
  app.post('/login', UserController.login);
  app.post('/logout', UserController.logout);
  app.post('/reports', ReportController.submitReport);
  app.post('/register', UserController.register);

  return app;
};

module.exports = { createServer };
