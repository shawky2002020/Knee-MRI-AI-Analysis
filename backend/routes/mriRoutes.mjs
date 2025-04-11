import express from "express";
import * as mriController from '../controllers/AIController.mjs'
import upload from "../middleware/uploadMiddleware.mjs";
import { authorize } from "../middleware/authMiddleware.mjs";
const router = express.Router();
router.use(authorize)

router.post("/upload",upload,mriController.process_Mri );
router.get("/scans",mriController.getMri );


export default router;
