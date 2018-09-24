const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  username: String,
  password: String,
  adress: {
    street: String,
    number: Number
  },
  role: {
    type: String,
    enum : ['USER', 'ADMIN'],
    default : 'USER'
  },
  isAgent: { type: Boolean, default: false},

  
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
