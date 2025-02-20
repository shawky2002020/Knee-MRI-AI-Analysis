import { Router } from "express";
import * as reportController from '../controllers/reportController.mjs';
import * as authMiddleware from "../middleware/authMiddleware.mjs";



const router = Router();
router.use(authMiddleware.authorize)

export default router;