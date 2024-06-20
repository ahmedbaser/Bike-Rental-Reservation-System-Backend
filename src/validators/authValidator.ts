import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(10).max(15),
  address: z.string().min(1),
  role: z.string().optional()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const validateSignUp = (req: Request, res: Response, next: NextFunction) => {
  try {
    signUpSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.errors[0].message
    });
  }
};

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.errors[0].message
    });
  }
};

export { validateSignUp, validateLogin };
