import express from "express";
import * as mriController from '../controllers/mriController.mjs'
import upload from "../middleware/uploadMiddleware.mjs";
const router = express.Router();

router.post("/upload",upload.single("image"),mriController.uploadMri );


export default router;
