import express from "express";
import * as scanHistoryController from '../controllers/scanController.mjs'
import * as AIController from '../controllers/aiController.mjs'
import upload from "../middleware/uploadMiddleware.mjs";
import { authorize } from "../middleware/authMiddleware.mjs";
const router = express.Router();
router.use(authorize)

router.post("/upload",upload,AIController.process_Mri );
// New route for multi-view MRI processing
router.post("/upload-multi-view", upload, AIController.process_Multi_View_Mri);

router.get("/scans", scanHistoryController.getAllScans);
router.delete("/delete/:scanId", scanHistoryController.deleteMri);


router.patch("/viewed/:scanId", scanHistoryController.updateViewed);
router.patch("/status", scanHistoryController.lowercaseResultStatus);


// router.patch("/name", scanHistoryController.updateName);
// router.get("/scans/:name", scanHistoryController.getScanByName);
export default router;
