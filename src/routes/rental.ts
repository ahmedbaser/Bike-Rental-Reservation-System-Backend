

import express from 'express';
import { createRental, returnBike, getAllRentalsForUser } from '../controllers/rentalController';
import { authenticate, authorize } from '../middlewares/auth';
import { validateCreateRental } from '../validators/rentalValidator';

const router = express.Router();

router.post('/', authenticate, validateCreateRental, createRental);
router.put('/:id/return', authenticate, authorize('admin'), returnBike);
router.get('/', authenticate, getAllRentalsForUser);

export default router;
