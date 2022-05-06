const path = require('path');

const express = require('express');

// Express Middleware
const helmet = require('helmet');
const morgan = require('morgan');

// Controllers
const { homeController } = require('./controllers/home.controller');

const webRoot = path.join(__dirname, '..', 'public');

// Creates a new express instance pre-loaded with middleware.
const createServer = () => {
  // Initialize an instance of express>
  const app = express();

  // Inject middleware
  app.use(helmet());
  app.use(morgan('combined'));

  // Configure view settings
  app.set('views', path.join(__dirname, '..', 'public'));
  app.set('view engine', 'ejs');

  // Expose all files in the webRoot directory
  app.use(express.static(webRoot));

  app.get('/', homeController);

  return app;
};

module.exports = { createServer };
