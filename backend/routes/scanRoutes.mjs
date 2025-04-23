import express from "express";
import * as scanHistoryController from '../controllers/scanController.mjs'
import * as AIController from '../controllers/aicontroller.mjs'
import upload from "../middleware/uploadMiddleware.mjs";
import { authorize } from "../middleware/authMiddleware.mjs";
const router = express.Router();
router.use(authorize)

router.post("/upload",upload,AIController.process_Mri );

router.get("/scans", scanHistoryController.getAllScans);
router.get("/scans/:name", scanHistoryController.getScanByName);
router.delete("/scans/:scanId", scanHistoryController.deleteMri);


router.patch("/name", scanHistoryController.updateName);
router.patch("/viewed", scanHistoryController.updateViewed);
router.patch("/status", scanHistoryController.lowercaseResultStatus);


export default router;
