import mongoose from 'mongoose';
import bcrypt from "bcryptjs";

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
    required : true,
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

// Method to check if user can login with password
userSchema.methods.canLoginWithPassword = function() {
  return !this.isGoogleUser && this.password;
};

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (this.isGoogleUser) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to check if account is linked
userSchema.methods.isLinkedAccount = function() {
  return this.isGoogleUser && this.password;
};
const User = mongoose.model('User', userSchema);


export default User;