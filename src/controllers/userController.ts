
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

// getUserProfile start
const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    res.json({
      success: true,
      statusCode: 200,
      message: 'User profile retrieved successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// updateUserProfile start
const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findByIdAndUpdate(req.user.userId, { name, phone }, { new: true });
    res.json({
      success: true,
      statusCode: 200,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export { getUserProfile , updateUserProfile };


