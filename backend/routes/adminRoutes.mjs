import { Router } from "express";
import * as adminController from "../controllers/adminController.mjs";
import * as authMiddleware from "../middleware/authMiddleware.mjs";

const router = Router();
router.use(authMiddleware.authorize, authMiddleware.authorizeAdmin);
router.get("/allusers", adminController.getAllUsers);
router.get("/user", adminController.getUser);
router.delete("/delete", adminController.deleteUser);

export default router;
