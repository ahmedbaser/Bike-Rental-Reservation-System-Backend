import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Rental, { IBike, IPopulatedRental } from '../models/Booking';
import Bike from '../models/Bike';




const bookBike = async (req: Request, res: Response) => {
  try {
    const { bikeId, startTime, advancePayment } = req.body;

    if (!bikeId || !startTime || typeof advancePayment !== 'number') {
      return res.status(400).json({ success: false, message: 'Missing or invalid required fields' });
    }

    const bike = await Bike.findById(bikeId);
    if (!bike) {
      return res.status(404).json({ success: false, message: 'Bike not found' });
    }

    if (!bike.isAvailable) {
      return res.status(400).json({ success: false, message: 'Bike is not available' });
    }

    const rental = new Rental({
      bikeId: bike._id,
      userId: req.user?.userId,
      startTime,
      advancePayment,
      status: 'Booked',
      isPaid: false,
    });

    await rental.save();

    bike.isAvailable = false;
    await bike.save({ validateBeforeSave: false });

    res.status(200).json({ success: true, message: 'Bike booked successfully', data: rental });
  } catch (error) {
    console.error("Error booking bike:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



const updateRentalStatus = async (rentalId: string): Promise<void> => {
  await Rental.findByIdAndUpdate(rentalId, { isPaid: true });
};



const handlePayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rentalId } = req.params;

    await updateRentalStatus(rentalId);
    
  res.status(200).json({
      success: true,
      message: 'Payment successful, rental status updated',
    });
  } catch (error) {
    next(error);
  }
};




const returnBike = async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const rental = await Rental.findById(req.params.id).session(session).populate<{ bikeId: IBike }>('bikeId');
    
    if (!rental || rental.isReturned || !rental.bikeId) {
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


    rental.isPaid = false;

    rental.bikeId.isAvailable = true;

    await rental.save({ session });
    await rental.bikeId.save({ session });

    await session.commitTransaction();
    res.json({
      success: true,
      statusCode: 200,
      message: 'Bike returned successfully',
      data: rental
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};




const getAllRentalsForUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { isPaid } = req.query;

    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const filter: any = { userId: req.user.userId };
    if (isPaid !== undefined) {
       filter.isPaid = isPaid === 'false';
    }

    const rentals = await Rental.find(filter)
      .populate({
        path: 'bikeId',
        select: 'pricePerHour name',
      })
      .exec();

    const populatedRentals: IPopulatedRental[] = rentals.map(rental => {
      if (rental instanceof Rental) {
        const rentalObj = rental.toObject() as IPopulatedRental;

        rentalObj.formattedStartTime = new Date(rental.startTime).toLocaleString() || 'Invalid Date';
        rentalObj.formattedReturnTime = rental.returnTime
          ? new Date(rental.returnTime).toLocaleString()
          : 'Not returned yet';

        return rentalObj;
      }
      throw new Error('Rental type mismatch');
    });
    populatedRentals.forEach(rental => {
      rental.formattedStartTime = new Date(rental.startTime).toLocaleString();
      rental.formattedReturnTime = rental.returnTime
        ? new Date(rental.returnTime).toLocaleString()
        : 'Not returned yet';
    });

    res.status(200).json({
      success: true,
      message: 'Rentals fetched successfully',
      data: populatedRentals,
    });
  } catch (error) {
    next(error);
  }
};




const getAllRentalsForAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const rentals = await Rental.find().populate<{ bikeId: IBike }>('bikeId').lean();

    const validRentals = rentals.filter(rental => rental.bikeId !== null);

    validRentals.forEach(rental => {
      if (rental.bikeId) {
        if (rental.returnTime) {
          const rentalDuration = (new Date(rental.returnTime).getTime() - new Date(rental.startTime).getTime()) / 3600000;
          rental.totalCost = Math.ceil(rentalDuration * rental.bikeId.pricePerHour);
        } else {
          rental.totalCost = 0;
        }
      }
    });

    res.status(200).json({
      success: true,
      data: validRentals,
    });
  } catch (error) {
    console.error('Error fetching rentals:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch rentals.',
    });
  }
};


  
  

export {
  bookBike,
  handlePayment,
  returnBike,
  getAllRentalsForUser,
  getAllRentalsForAdmin
};

   




























































































