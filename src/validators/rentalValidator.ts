import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const createRentalSchema = z.object({
  bikeId: z.string().min(1),
  startTime: z.string().min(1)
});

const validateCreateRental = (req: Request, res: Response, next: NextFunction) => {
  try {
    createRentalSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
     
      message: error.errors[0].message
    });
  }
};

export { validateCreateRental };