import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      userId: string;
      role: string;
    };
  }
}

interface DecodedToken {
  userId: string;
  role: string;
}

// Authenticate middleware
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }

  try {
    if (!config.jwt_secret) {
      throw new Error('JWT secret is missing in config.');
    }

    const decoded = jwt.verify(token, config.jwt_secret) as DecodedToken;
    console.log('Decoded token:', decoded);
    req.user = decoded; 
    next();
  } catch (error) {
    console.error('Invalid token:', error);
    res.status(400).json({
      success: false,
      message: 'Invalid token.',
    });
  }
};

// Authorize middleware
const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. No user found in request.',
      });
    }

    if (!roles || roles.length === 0) {
      console.error('No roles provided to authorize.');
      return res.status(500).json({
        success: false,
        message: 'Internal server error. No roles to authorize.',
      });
    }

    if (!roles.includes(req.user.role)) {
      console.log(`Role mismatch: expected ${roles}, got ${req.user.role}`);
      return res.status(403).json({
        success: false,
        message: 'Access denied. Role mismatch.',
      });
    }
    next();
  };
};

export { authenticate, authorize };




























