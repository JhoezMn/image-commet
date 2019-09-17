const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String },
  password: { type: String },
  fullname: { type: String },
  gravatar: { type: String },
  email: { type: String }  
});


module.exports = mongoose.model('Users', UserSchema);
