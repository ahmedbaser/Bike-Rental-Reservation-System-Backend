import { DecodedToken } from '../src/middleware/auth'; // Adjust the path as necessary

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}