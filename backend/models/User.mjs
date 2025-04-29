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
    required: true,
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
  }

});

const User = mongoose.model('User', userSchema);


export default User;