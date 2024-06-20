

import express from 'express';
import { createBike, getAllBikes, updateBike, deleteBike } from '../controllers/bikeController';
import { authenticate, authorize } from '../middlewares/auth';
import { validateCreateBike, validateUpdateBike } from '../validators/bikeValidator';

const router = express.Router();

router.post('/', authenticate, authorize('admin'), validateCreateBike, createBike);
router.get('/', getAllBikes);
router.put('/:id', authenticate, authorize('admin'), validateUpdateBike, updateBike);
router.delete('/:id', authenticate, authorize('admin'), deleteBike);

export default router;
