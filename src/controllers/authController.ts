import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config'


// Signup part
const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Automatically assign the "USER" role
    const role = "user";
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, phone, address, role });

    await user.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'User registered successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,  
      }
    });
  } catch (error) {
    next(error);
  }
};


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
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      }
    });
  } catch (error) {
    next(error);
  }
};



export { signUp, login };