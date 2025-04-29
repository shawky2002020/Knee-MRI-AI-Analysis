import { Router } from "express";
import * as userController from "../controllers/admin/userController.mjs";
import * as authMiddleware from "../middleware/authMiddleware.mjs";

const router = Router();
router.use(authMiddleware.authorize, authMiddleware.authorizeAdmin);
router.get("/allusers", userController.getAllUsers);
router.get("/user", userController.getUser);
router.delete("/delete", userController.deleteUser);

router.post("/addRoles", userController.addRole);

export default router;
