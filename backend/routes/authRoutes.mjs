import { Router } from "express";
import * as authController from '../controllers/authController.mjs';


const router = Router();

router.get('/login', authController.login); 
router.post('/register', authController.register);

export default router;