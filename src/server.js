const path = require('path');

const express = require('express');

// Express Middleware
const helmet = require('helmet');
const morgan = require('morgan');

// Creates a new express instance pre-loaded with middleware.
const createServer = () => {
  // Initialize an instance of express>
  const app = express();

  // Inject middleware
  app.use(helmet());
  app.use(morgan('combined'));

  return app;
};

module.exports = { createServer };
