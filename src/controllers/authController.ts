import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config';

// singUp part start
const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, phone, address, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, phone, address, role });
    await user.save();
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'User registered successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
}
// login part start
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, config.jwt_secret, { expiresIn: '24h' });
    res.json({
      success: true,
      statusCode: 200,
      message: 'User logged in successfully', 
      token,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export { signUp, login };
