import mongoose from 'mongoose';

const { Schema } = mongoose;

const notificationSchema = new Schema({
  userID: {
    type: Number,
    required: true,
  },
  title: {
    type: String, 
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  read:{
    type:Boolean,
    required:true, 
    default:false
  }
});

const notification = mongoose.model('notifications', notificationSchema);

export default notification;