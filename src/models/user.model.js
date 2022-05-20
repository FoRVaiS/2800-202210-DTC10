const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  email: String,
  password: String,
  age: Number,
  gender: String,
  roles: [String],
});

const UserModel = model('user', userSchema);

module.exports = { UserModel }; 
