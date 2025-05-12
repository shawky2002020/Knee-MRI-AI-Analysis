import { Router } from "express";
import * as userController from "../controllers/admin/userController.mjs";
import * as authMiddleware from "../middleware/authMiddleware.mjs";
import * as scansController from "../controllers/admin/scansController.mjs";

const router = Router();
//USER
router.use(authMiddleware.authorizeAdmin);
router.get("/users", userController.getAllUsers);
router.get("/user", userController.getUser);
router.get("/userstates", userController.getUserStats);
router.delete("/deleteUser/:id", userController.deleteUser);
router.post("/addRoles", userController.addRole);

//SCANS 
router.get("/DiagnosisDistribution", scansController.getDiagnosisDistribution)
router.get("/userscans", scansController.getUserScanCounts)

export default router;
