import { Router } from "express";
import * as userController from "../controllers/admin/userController.mjs";
import * as authMiddleware from "../middleware/authMiddleware.mjs";

const router = Router();
router.use(authMiddleware.authorizeAdmin);
router.get("/users", userController.getAllUsers);
router.get("/user", userController.getUser);
router.delete("/delete/:id", userController.deleteUser);

router.post("/addRoles", userController.addRole);

export default router;
