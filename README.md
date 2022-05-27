# Payswap

PaySwap is a web-based platform that allows people to anonymously compare their compensation to that of others in the same profession, in order to combat pay discrimination based on age or gender.

[Check out our live demo!](https://payswap.herokuapp.com)

- [Payswap](#payswap)
  - [Features](#features)
  - [Technology Used](#technology-used)
    - [Front End](#front-end)
    - [Back End](#back-end)
    - [Extra Tooling](#extra-tooling)
  - [Getting Started](#getting-started)
    - [Prerequites](#prerequites)
      - [Node](#node)
      - [Mongodb](#mongodb)
      - [Set up configuration](#set-up-configuration)
      - [Populate your database](#populate-your-database)
    - [Install the app](#install-the-app)
    - [Starting your application](#starting-your-application)
    - [Tests](#tests)
      - [Integration Tests](#integration-tests)
      - [Unit Tests](#unit-tests)
  - [Project Structure](#project-structure)
  - [Contact Us](#contact-us)

## Features
1. Account registration and login.
2. Add your pay.
3. Display a list of all salaries that relate to your job title.
4. Search for pay rate by company and display locations on a map.
5. Sort salary tables by pay.
6. Salary reporting to flag a post for review.
7. Admins can review reports and manage user posts.

## Technology Used

### Front End
* Bootstrap
* jQuery
* Leaflet
* matter.js

### Back End
* Express.js
* Express-session
* ejs
* Mongoose
* node-fetch
* helmet
* morgan
* Heroku

### Extra Tooling
* config.js
* Jest
* Playwright
* cross-env

## Getting Started

### Prerequites

#### Node
1. Install [Node.js](https://nodejs.org/en/) LTS for your operating system.

#### Mongodb
1. Register for an account on [Mongo Atlas](https://www.mongodb.com/cloud/atlas/register).
2. Verify your account from your email.
2. Once redirected from the verifaction email, click on the green "continue" button.
4. Select the appropriate options in the 3 dropdown menus.
5. Click "Finish" at the bottom right the screen.
6. Click "Create" on the right-most panel labelled "FREE".
7. Click "Create Cluster" on the bottom right of the screen.
8. Select the username field and input a username you will use to access the database.
9. Select the password field and input a password you will use to access the database.
(**REMEMBER THESE CREDENTIALS**)
10. Click "Create User".
11. Click on "Database" at the top of the left-side navbar.
12. Click on "Connect" next to the "Cluster0" text.
13. In the modal that pops up, click on "Allow access from anywhere" in the section #1.
14. Click "Add IP Address".
15. Click "Choose connection method".
16. Choose "Connection with MongoDB Shell".
17. Copy the connection string in section #3.

#### Set up configuration
1. Create a `local.json` file in the `config/` folder with the following contents.
```json
{
  "secret": "RANDOM CHARACTERS",
  "mongo": {
    "connectionString": "YOUR MONGO CONNECTION STRING HERE"
  }
}
```
2. Replace the "secret" value with any random string (can contain any characters)
3. Replace the "connectionString" value with your mongodb connection string that was copied from the previous step.

#### Populate your database
1. Run the following script to populate your database
```shell
$ node ./scripts/generate-fake-data.js
```

### Install the app
1. Open your favorite terminal to this project folder
2. Install the dependencies
```shell
$ npm install
```

### Starting your application
1. Run your server for development
```shell
$ npm run start:dev
```

2. Run your server for production
```shell
$ npm start
```

### Tests

#### Integration Tests
```shell
$ npm run test:e2e
```

#### Unit Tests
```shell
$ npm run test:unit
```

## Project Structure
```
├── README.md
├── __jest__
│   └── controllers
│       ├── home.controller.test.js
│       ├── report.controller.test.js
│       ├── salary.controller.test.js
│       └── user.controller.test.js
├── __playwright__
│   └── views.test.js
├── config
│   ├── custom-environment-variables.json
│   └── default.json
├── jest.config.js
├── package-lock.json
├── package.json
├── playwright.config.js
├── public
│   ├── images
│   │   ├── afterExplosion.png
│   │   ├── beforeExplosion.png
│   │   ├── boxC.png
│   │   ├── boxH.png
│   │   ├── boxI.png
│   │   ├── boxN.png
│   │   ├── boxO.png
│   │   ├── boxP.png
│   │   ├── boxT.png
│   │   ├── boxY.png
│   │   ├── easterEggExplodey.png
│   │   ├── error.jpg
│   │   ├── logo.svg
│   │   └── team-photo.jpg
│   ├── pages
│   │   ├── _partials
│   │   │   ├── footer.ejs
│   │   │   └── navbar.ejs
│   │   ├── about-us
│   │   │   ├── about-us.ejs
│   │   │   └── about-us.js
│   │   ├── admin
│   │   │   ├── admin.css
│   │   │   ├── admin.ejs
│   │   │   └── admin.js
│   │   ├── easter-egg
│   │   │   ├── easter-egg.ejs
│   │   │   └── easter-egg.js
│   │   ├── error
│   │   │   ├── error.ejs
│   │   │   └── error.js
│   │   ├── index
│   │   │   ├── autocomplete.js
│   │   │   ├── index.css
│   │   │   ├── index.ejs
│   │   │   ├── index.js
│   │   │   └── temp.html
│   │   ├── login
│   │   │   ├── login.css
│   │   │   ├── login.ejs
│   │   │   └── login.js
│   │   ├── register
│   │   │   ├── register.css
│   │   │   ├── register.ejs
│   │   │   └── register.js
│   │   ├── salary-form
│   │   │   ├── autocomplete.js
│   │   │   ├── salary-form.css
│   │   │   ├── salary-form.ejs
│   │   │   └── salary-form.js
│   │   └── search
│   │       ├── search.ejs
│   │       └── search.js
│   ├── scripts
│   │   ├── global.js
│   │   └── vendors
│   │       ├── jquery-ui
│   │       │   └── jquery-ui.js
│   │       └── leaflet-1.8.0
│   │           ├── images
│   │           │   ├── layers-2x.png
│   │           │   ├── layers.png
│   │           │   ├── marker-icon-2x.png
│   │           │   ├── marker-icon.png
│   │           │   └── marker-shadow.png
│   │           ├── leaflet.css
│   │           ├── leaflet.js
│   │           └── leaflet.js.map
│   └── styles
│       └── global.css
├── scripts
│   └── generate-fake-data.js
└── src
    ├── controllers
    │   ├── aboutus.controller.js
    │   ├── easter.controller.js
    │   ├── form.controller.js
    │   ├── home.controller.js
    │   ├── report.controller.js
    │   ├── salary.controller.js
    │   ├── search.controller.js
    │   └── user.controller.js
    ├── index.js
    ├── middleware
    │   ├── requireAuthentication.js
    │   └── requireRole.js
    ├── models
    │   ├── company.model.js
    │   ├── report.model.js
    │   └── user.model.js
    ├── routes
    │   ├── apiv1.js
    │   ├── proxy.js
    │   └── views.js
    └── server.js
```

## Contact Us
If you have any questions, please submit an issue in the issues section otherwise please feel free to send an email:   
- Benjamin Chiang - bchiang10@my.bcit.ca
- Shey Barpagga - sbarpagga@my.bcit.ca
- Richard Fenton - rfenton9@my.bcit.ca
- Malik Nour - nottoti8457@gmail.com