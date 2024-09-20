import { Request, Response, NextFunction } from 'express';

// errorHandler part start
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errorMessages: err.errors || [{ path: '', message: err.message }],
  });
};

export default errorHandler;
