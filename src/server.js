const path = require('path');

const express = require('express');
const config = require('config');

// Express Middleware
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');

// Controllers
const { homeGetController } = require('./controllers/home.controller');
const { loginGetController, loginPostController } = require('./controllers/login.controller');
const { logoutPostController } = require('./controllers/logout.controller');
const { fetchAccountsPostController } = require('./controllers/fetchAccounts.controller');
const { reportListingPostController, reportListingGetController } = require('./controllers/reportListing.controller');
const { signUpPostController, signUpGetController } = require('./controllers/signup.controller');

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

  app.get('/', homeGetController);
  app.get('/register', signUpGetController);
  app.get('/login', loginGetController);
  app.get('/report', reportListingGetController);
  app.post('/login', loginPostController);
  app.post('/logout', logoutPostController);
  app.post('/accounts', fetchAccountsPostController);
  app.post('/reports', reportListingPostController);
  app.post('/register', signUpPostController);

  return app;
};

module.exports = { createServer };
