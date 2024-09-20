import express from 'express';
import { authenticate, } from '../middlewares/auth';
import { createPaymentIntent } from '../controllers/paymentController';

const router = express.Router();

router.post('/create-payment-intent', authenticate, createPaymentIntent);

export default router;


