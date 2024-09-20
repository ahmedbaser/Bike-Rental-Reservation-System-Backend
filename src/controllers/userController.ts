import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import Rental from '../models/Rental';

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
    const { name, email, phone, address} = req.body;
    const user = await User.findByIdAndUpdate(req.user.userId, { name, phone, email, address }, { new: true });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
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



// get all users start
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find(); 
    res.json({
      success: true,
      statusCode: 200,
      message: 'All users retrieved successfully',
      data: users,
    });
  } catch (error) {
    next(error); 
  }
};




// deleteUser start
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      statusCode: 200,
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};


// promoteUserToAdmin start
const promoteUserToAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(userId, { role: 'admin' }, { new: true });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      statusCode: 200,
      message: 'User promoted to admin successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};


const userRentals = async(req:Request, res: Response) => {
  try {
    // Find rentals for the authenticated user
    const rentals = await Rental.find({ userId: req.user.userId }).populate('bikeId');

    if (!rentals) {
      return res.status(404).json({ message: 'No rentals found for this user.' });
    }

    res.status(200).json({ success: true, data: rentals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}




export { getUserProfile , updateUserProfile, userRentals , deleteUser, promoteUserToAdmin, getAllUsers};




