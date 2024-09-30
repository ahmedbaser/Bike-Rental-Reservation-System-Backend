import express from 'express';
import { returnBike, getAllRentalsForUser, handlePayment, bookBike, getAllRentalsForAdmin,  } from '../controllers/rentalController';
import { authenticate, authorize } from '../middlewares/auth';

const router = express.Router();

router.put('/return/:id', authenticate, authorize(['admin']), returnBike);
router.get('/', authenticate, getAllRentalsForUser);
router.post('/book', authenticate,authorize(['user']), bookBike);
router.post('/pay/:rentalId', authenticate, authorize(['user']), handlePayment);


router.get('/admin', authenticate, authorize(['admin']), getAllRentalsForAdmin);
export default router;














