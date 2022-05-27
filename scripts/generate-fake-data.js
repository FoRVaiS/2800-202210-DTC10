const mongoose = require('mongoose');
const config = require('config');

const { UserModel } = require('../src/models/user.model');
const { CompanyModel } = require('../src/models/company.model');

const randBetweenRange = (min, max) => Math.random() * ((max - min) - 1) + min;

const doesCompanyExist = async name => (await CompanyModel.find({ name })).length;
const doesLocationExist = async (company, location) => (await CompanyModel.find({
  name: company,
  locations: {
    $elemMatch: { name: location },
  },
})).length;

const insertLocationAtCompany = (company, location, position, userId, salary) => CompanyModel.updateOne({
  name: company,
}, {
  $push: {
    locations: {
      name: location,
      salaries: [
        {
          userId,
          salary,
          position,
        },
      ],
    },
  },
});

const insertSalaryAtLocation = (location, position, userId, salary) => CompanyModel.updateOne({
  locations: {
    $elemMatch: { name: location },
  },
}, {
  $push: {
    'locations.$.salaries': {
      userId,
      salary,
      position,
    },
  },
});

const createNewCompany = (company, location, position, userId, salary) => CompanyModel.create({
  name: company,
  locations: [{
    name: location,
    salaries: [
      {
        userId,
        salary,
        position,
      },
    ],
  }],
});

const nameDictionary = {
  first: [['Joseph', 'male'], ['Darryl', 'male'], ['Angela', 'female'], ['Ashley', 'female'], ['Herbert', 'male']],
  last: ['Small', 'Harding', 'Ramirez', 'Shepherd'],
};

const companies = [
  {
    name: 'McDonald\'s',
    jobs: ['cashier'],
    locations: [
      '7289 Knight St',
      '830 SW Marine Dr',
      '7360 Market Crossing',
    ],
  },
  {
    name: 'Winners',
    jobs: ['sales associate'],
    locations: [
      '4700 Kingsway',
      '448 SW Marine Dr',
      '5300 No. 3 Rd',
    ],
  },
  {
    name: 'No Frills',
    jobs: ['cashier', 'produce clerk'],
    locations: [
      '1460 E Hastings St',
      '1688 W 4th Ave',
      '15355 Fraser Hwy',
    ],
  },
  {
    name: 'Shoppers Drug Mart',
    jobs: ['sales associate'],
    locations: [
      '6305 Fraser St',
      '2607 E 49th Ave Unit 102',
      '8525 River District Crossing',
    ],
  },
  {
    name: 'Real Canadian Superstore',
    jobs: ['cashier', 'produce clerk'],
    locations: [
      '3000 Lougheed Hwy.',
      '4700 Kingsway #1105',
      '4651 No. 3 Rd',
    ],
  },
];

const SALERIES_PER_LOCATION = 3;

(async () => {
  mongoose.connect(config.get('mongo.connectionString'));
  // Create demo accounts
  console.log('Creating demo accounts...');
  await UserModel.create({
    email: 'admin@bcit.ca',
    password: '123',
    age: 23,
    gender: 'male',
    roles: ['admin', 'member'],
  });

  await UserModel.create({
    email: 'user@bcit.ca',
    password: '123',
    age: 18,
    gender: 'female',
    roles: ['member'],
  });

  console.log('Generating a flat array of jobs...');
  const jobs = Array.from(Array(SALERIES_PER_LOCATION)).flatMap(() => companies.flatMap(company => company.locations
    .flatMap(location => ({
      company: company.name,
      location,
      position: company.jobs[Math.round(randBetweenRange(0, company.jobs.length))],
      salary: Number(randBetweenRange(15.20, 19.25).toFixed(2)),
    }))));

  for (const { company, salary, position, location } of jobs) {
    const firstName = nameDictionary.first[Math.round(randBetweenRange(0, nameDictionary.first.length))][0].toLowerCase();
    const gender = nameDictionary.first[Math.round(randBetweenRange(0, nameDictionary.first.length))][1].toLowerCase();
    const lastName = nameDictionary.last[Math.round(randBetweenRange(0, nameDictionary.last.length))].toLowerCase();

    const user = await UserModel.create({
      email: `${firstName}${lastName}@example.com`,
      password: '123',
      gender,
      age: Math.round(randBetweenRange(19, 34)),
      roles: ['member'],
    });

    const uid = user._id;

    const companyExists = await doesCompanyExist(company);

    if (companyExists) {
      const locationExists = await doesLocationExist(company, location);
  
      if (locationExists) {
        // The company and location already exist
        await insertSalaryAtLocation(location, position, uid, salary);
      } else {
        // The company exists but the location is new
        await insertLocationAtCompany(company, location, position, uid, salary);
      }
    } else {
      // The company does not exist
      await createNewCompany(company, location, position, uid, salary);
    }
  }

  console.log('Data generation complete!');
  mongoose.connection.close();
})();
