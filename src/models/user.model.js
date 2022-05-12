const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  email: String,
  password: String,
  roles: [String],
});

const userModel = model('user', userSchema);

module.exports = { userModel }; 
