import { Router } from "express";
import * as authController from '../controllers/authController.mjs';


const router = Router();

router.post('/login', authController.login); 
router.post('/register', authController.register);
router.post('/google-login', authController.googleLogin);

export default router;