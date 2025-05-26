import mongoose from "mongoose";

const { Schema } = mongoose;

const notificationSchema = new Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
  read: {
    type: Boolean,
    required: true,
    default: false,
  },
  reportID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "reports",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

const notification = mongoose.model("notifications", notificationSchema);

export default notification;
