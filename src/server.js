const path = require('path');

const express = require('express');
const config = require('config');

// Express Middleware
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');

// Controllers
const { homeController } = require('./controllers/home.controller');
const { loginGetController, loginPostController } = require('./controllers/login.controller');
const { logoutPostController } = require('./controllers/logout.controller');
const { fetchAccountsPostController } = require('./controllers/fetchAccounts.controller');

const webRoot = path.join(__dirname, '..', 'public');

// Creates a new express instance pre-loaded with middleware.
const createServer = () => {
  // Initialize an instance of express>
  const app = express();

  const secret = config.get('secret');

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

  app.get('/', homeController);
  app.get('/login', loginGetController);
  app.post('/login', loginPostController);
  app.post('/logout', logoutPostController);
  app.post('/fetchAccounts', fetchAccountsPostController);

  return app;
};

module.exports = { createServer };
