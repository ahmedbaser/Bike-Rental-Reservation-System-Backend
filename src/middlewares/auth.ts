 
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

interface DecodedToken {
  userId: string;
  role: string;
  user?:any;
}

// authenicate part start
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log(token)
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied.No token provided.',
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwt_secret!) as DecodedToken;
    console.log("decoded token", decoded)
    req.user = decoded
    next();
  } catch (error) {
    console.log(error)
    res.status(400).json({
      
      success: false,
      message: 'Invalid token.',
    });
  }

};


// authorize part start
const authorize = (role: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        return res.status(403).json({
          success: false,
          message: 'Access denied.'
        });
      }
      if (req.user.role !== role) {
        console.log(`Role mismatch: expected ${role}, got ${req.user.role}`);
        return res.status(403).json({
          success: false,
          message: 'Access denied.'
        });
      }
      next();
    };
  };

  
export { authenticate, authorize };

