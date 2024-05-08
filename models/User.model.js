const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
  password: { type: 'String', required: true },
  login: { type: 'String', required: true },
  avatar: { type: 'String', required: true },
  phoneNumber: { type: 'Number', required: true }
});

module.exports = mongoose.model('User', userSchema);