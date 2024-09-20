import express from 'express';
import { createCoupon, getCoupons, updateCoupon, deleteCoupon } from '../controllers/couponController';
import { authenticate, authorize } from '../middlewares/auth';

const router = express.Router();

// Admin-only access for managing coupons
router.post('/', authenticate, authorize(['admin']), createCoupon);
router.get('/', authenticate, authorize(['admin']), getCoupons);
router.patch('/:id', authenticate, authorize(['admin']), updateCoupon);
router.delete('/:id', authenticate, authorize(['admin']), deleteCoupon);

export default router;
