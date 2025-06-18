import { Router } from "express";
import ReportController from '../controllers/reportController.mjs';
import * as authMiddleware from "../middleware/authMiddleware.mjs";
import express from "express";

const reportController = new ReportController();


const router = express.Router();

router.use(authMiddleware.authorize)

// Generate PDF report

// Generate HTML report (for preview/testing)
router.post('/generate', async (req, res) => {
  await reportController.generateReport(req, res);
});



export default router;