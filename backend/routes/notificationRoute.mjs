import express from "express";
import * as notificationController from "../controllers/notificationController.mjs";
import { authorize } from "../middleware/authMiddleware.mjs";
const router = express.Router();
router.use(authorize);
router.get("/all", notificationController.getAllNotifications);
router.get("/count", notificationController.getNotificationCount);
router.post("/add", notificationController.createNotification);
router.delete("/delete/:id", notificationController.deleteNotification);
router.delete("/deleteAll", notificationController.deleteAll);

export default router;
