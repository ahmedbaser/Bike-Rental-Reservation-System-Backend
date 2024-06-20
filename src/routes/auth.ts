


import express from 'express';
import { signUp, login } from '../controllers/authController';
import { validateSignUp, validateLogin } from '../validators/authValidator';

const router = express.Router();

router.post('/signup', validateSignUp, signUp);
router.post('/login', validateLogin, login);

export default router;
