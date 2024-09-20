import { Router } from 'express';
import { getUserProfile, updateUserProfile, userRentals, getAllUsers, deleteUser, promoteUserToAdmin } from '../controllers/userController';
import { authenticate, authorize } from '../middlewares/auth';

const router = Router();


router.get('/profile', authenticate,authorize(['admin', 'user']), getUserProfile);
router.put('/profile', authenticate, updateUserProfile);
router.get('/rentals', authenticate, userRentals);
router.get('/all', authenticate, authorize(['admin']), getAllUsers);
router.delete('/:id', authenticate, authorize(['admin']), deleteUser);
router.put('/promote/:id', authenticate, authorize(['admin']), promoteUserToAdmin);

export default router;











