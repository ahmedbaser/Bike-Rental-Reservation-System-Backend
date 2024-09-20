import { DecodedToken } from '../src/middleware/auth'; 

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}