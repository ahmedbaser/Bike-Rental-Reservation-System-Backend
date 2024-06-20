
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Rental from '../models/Booking';
import Bike from '../models/Bike';

// createRental part start
const createRental = async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { bikeId, startTime } = req.body;
    const userId = req.user.userId;

    const bike = await Bike.findById(bikeId).session(session);
    if (!bike || !bike.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Bike is not available for rental'
      });
    }

    const rental = new Rental({ userId, bikeId, startTime });
    bike.isAvailable = false;
    await rental.save({ session });
    await bike.save({ session });

    await session.commitTransaction();
    res.json({
      success: true,
      statusCode: 200,
      message: 'Rental created successfully',
      data: rental
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};
 
// returnBike part start
const returnBike = async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const rental = await Rental.findById(req.params.id).session(session).populate('bikeId');
    if (!rental || rental.isReturned) {
      return res.status(400).json({
        success: false,
        message: 'Rental not found or already returned'
      });
    }

    const currentTime = new Date();
    const rentalDuration = (currentTime.getTime() - rental.startTime.getTime()) / 3600000;
    const totalCost = Math.ceil(rentalDuration * rental.bikeId.pricePerHour);
 
    rental.returnTime = currentTime;
    rental.totalCost = totalCost;
    rental.isReturned = true;

    const bike = await Bike.findById(rental.bikeId._id).session(session);
    bike.isAvailable = true;

    await rental.save({ session });
    await bike.save({ session });

    await session.commitTransaction();
    res.json({
      success: true,
      statusCode: 200,
      message: 'Bike returned successfully',
      data: rental  // Ensure totalCost is included in the response
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

// getAllRentalsForUser part start
const getAllRentalsForUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rentals = await Rental.find({ userId: req.user.userId }).populate('bikeId');
    // Calculate totalCost for each rental
    rentals.forEach(rental => {
      if (rental.returnTime) {
        const rentalDuration = (rental.returnTime.getTime() - rental.startTime.getTime()) / 3600000;
        rental.totalCost = Math.ceil(rentalDuration * rental.bikeId.pricePerHour);
      } else {
        rental.totalCost = 0; // Handle rentals that haven't been returned yet
      }
    });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Rentals retrieved successfully',
      data: rentals
    });
  } catch (error) {
    next(error);
  }
};


export { createRental, returnBike, getAllRentalsForUser };
