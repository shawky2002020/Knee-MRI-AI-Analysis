import { Router } from "express";
import * as reportController from '../controllers/reportController.mjs';
import * as authMiddleware from "../middleware/authMiddleware.mjs";
import express from "express";



const router = express.Router();

router.use(authMiddleware.authorize)
router.post('/generate', reportController.generateReport);


export default router;