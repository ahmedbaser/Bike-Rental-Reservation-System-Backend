import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const createBikeSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  pricePerHour: z.number().min(1),
  isAvailable: z.boolean().optional().default(true),
  cc: z.number().min(1),
  year: z.number().min(1900),
  model: z.string().min(1),
  brand: z.string().min(1)
});

const updateBikeSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  pricePerHour: z.number().min(1).optional(),
  isAvailable: z.boolean().optional(),
  cc: z.number().min(1).optional(),
  year: z.number().min(1900).optional(),
  model: z.string().min(1).optional(),
  brand: z.string().min(1).optional()
});

const validateCreateBike = (req: Request, res: Response, next: NextFunction) => {
  try {
    createBikeSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.errors[0].message
    });
  }
};

const validateUpdateBike = (req: Request, res: Response, next: NextFunction) => {
  try {
    updateBikeSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.errors[0].message
    });
  }
};

export { validateCreateBike, validateUpdateBike };




