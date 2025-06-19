import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    capitalize: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role:{
    type: String,
    requred : true,
    default : 'user'
  },
  password: {
    type: String,
    required: function () {
      return !this.isGoogleUser;
    },
  },
  aiAccess: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt:{
    type : Date,
    default:Date.now
  },
  lastLogin: {
    type: Date,
    default: null
  },
  loginCount: {
    type: Number,
    default: 0
  },
  isGoogleUser: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', userSchema);


export default User;