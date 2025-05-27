import { io, userSocketMap } from "../config/serverConfig.mjs";
import notification from "../models/notifications.mjs";

export class Notification {
  constructor({
    userID = null,
    title,
    message,
    type,
    read = false,
    reportID = null,
    createdAt = new Date(),
  }) {
    this.userID = userID;
    this.title = title;
    this.message = message;
    this.type = type;
    this.read = read;
    this.reportID = reportID;
    this.createdAt = createdAt;
  }
}


export async function notifyUser(userID,event,notiData) {
  try {
    const newNoti = new notification(notiData);
    newNoti.userID = userID;
    await newNoti.save();

    const socketId = userSocketMap.get(userID);
    if (socketId) {
      io.to(socketId).emit(event, newNoti);
    } else {
      console.log(`User ${notiData.userID} is not connected`);
    }
  } catch (error) {
    console.error("Notification sending failed:", error);
  }
}

