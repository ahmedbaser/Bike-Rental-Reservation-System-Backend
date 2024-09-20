import { Request, Response, } from 'express';
import Rental from '../models/Rental'; 

const Paid = async (req: Request, res: Response) => { 
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }
    
    const rentals = await Rental.find({ userId: req.user.userId })
      .populate('bikeId', 'name pricePerHour'); 
    
    return res.status(200).json({
      success: true,
      message: 'Rentals fetched successfully',
      rentals
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching rentals',
      error: (error as Error).message
    });
  }
};

export default Paid;
