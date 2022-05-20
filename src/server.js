const path = require("path");

const express = require("express");
const config = require("config");

// Express Middleware
<<<<<<< HEAD
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');

// Routes
const viewsRouter = require('./routes/views');
const apiv1Router = require('./routes/apiv1');
=======
const helmet = require("helmet");
const morgan = require("morgan");
const session = require("express-session");

// Controllers
const { homeGetController } = require("./controllers/home.controller");
const {
  loginGetController,
  loginPostController,
} = require("./controllers/login.controller");
const { logoutPostController } = require("./controllers/logout.controller");
const {
  fetchAccountsPostController,
} = require("./controllers/fetchAccounts.controller");
>>>>>>> richard_login

const webRoot = path.join(__dirname, "..", "public");

// Creates a new express instance pre-loaded with middleware.
const createServer = () => {
  // Initialize an instance of express>
  const app = express();

  const secret =
    process.env.NODE_ENV === "production" ? config.get("secret") : "devsecret";

  // Inject middleware
  app.use(helmet());
  app.use(morgan("combined"));
  app.use(express.json());
  app.use(
    session({
      secret,
      resave: false,
      saveUninitialized: true,
    })
  );

  // Configure view settings
  app.set("views", path.join(__dirname, "..", "public"));
  app.set("view engine", "ejs");

  // Expose all files in the webRoot directory
  app.use(express.static(webRoot));

<<<<<<< HEAD
  mongoose.connect(config.get('mongo.connectionString'));

  app.use('/', viewsRouter.router);
  app.use('/api/v1', apiv1Router.router);
=======
  app.get("/", homeGetController);
  app.get("/login", loginGetController);
  app.post("/login", loginPostController);
  app.post("/logout", logoutPostController);
  app.post("/accounts", fetchAccountsPostController);
>>>>>>> richard_login

  return app;
};

module.exports = { createServer };
