const { model, Schema, Types } = require('mongoose');

const companySchema = new Schema({
  name: String,
  locations: [
    {
      name: String,
      salaries: [
        {
          userId: Types.ObjectId,
          position: String,
          salary: Number,
        },
      ],
    },
  ],
});

const companyModel = model('company', companySchema);

module.exports = { companyModel }; 
