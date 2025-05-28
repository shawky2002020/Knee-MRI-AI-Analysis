import { Router } from "express";
import * as userController from "../controllers/admin/userController.mjs";
import * as authMiddleware from "../middleware/authMiddleware.mjs";
import * as scansController from "../controllers/admin/scansController.mjs";

const router = Router();

//USER
router.use(authMiddleware.authorizeAdmin);
router.get("/users", userController.getAllUsers);
router.get("/user", userController.getUser);
router.post("/create", userController.createUser);
router.delete("/deleteUser/:id", userController.deleteUser);
router.put("/editUser/:id", userController.updateUser);
router.put("/role", userController.addRole);
router.patch("/access", userController.changeAccess);

router.get("/userstates", userController.getUserStats);


//SCANS 
router.get("/DiagnosisDistribution", scansController.getDiagnosisDistribution)
router.get("/userscans", scansController.getUserScanCounts)

export default router;
