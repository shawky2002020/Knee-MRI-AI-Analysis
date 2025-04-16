import notification from "../models/notifications.mjs";
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNotification = async (req, res) => {
  const newNotification = new notification(req.body);
  try {
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    await notification.deleteOne({ _id: id });
    res.status(200).json({ message: "Notification deleted successfully." });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteAll = async (req, res) => {
  const { userID } = req.params;
  try {
    await notification.deleteMany({ userID });
    res.status(200).json({ message: "Notification deleted successfully." });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
