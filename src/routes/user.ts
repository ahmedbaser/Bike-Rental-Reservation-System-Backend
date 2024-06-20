import { Router } from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController';
import { authenticate, authorize } from '../middlewares/auth';

const router = Router();

router.get('/me', authenticate,authorize('admin', 'user'), getUserProfile);
router.put('/me', authenticate, updateUserProfile);

export default router;



