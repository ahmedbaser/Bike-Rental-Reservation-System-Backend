"use strict";
// import { Request, Response, NextFunction } from 'express';
// import mongoose from 'mongoose';
// import Rental, { IBike, IPopulatedRental } from '../models/Booking';
// import Bike from '../models/Bike';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRentalsForAdmin = exports.getAllRentalsForUser = exports.returnBike = exports.handlePayment = exports.bookBike = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Booking_1 = __importDefault(require("../models/Booking"));
const Bike_1 = __importDefault(require("../models/Bike"));
const bookBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { bikeId, startTime, advancePayment } = req.body;
        if (!bikeId || !startTime || typeof advancePayment !== 'number') {
            return res.status(400).json({ success: false, message: 'Missing or invalid required fields' });
        }
        const bike = yield Bike_1.default.findById(bikeId);
        if (!bike) {
            return res.status(404).json({ success: false, message: 'Bike not found' });
        }
        if (!bike.isAvailable) {
            return res.status(400).json({ success: false, message: 'Bike is not available' });
        }
        const rental = new Booking_1.default({
            bikeId: bike._id,
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
            startTime,
            advancePayment,
            status: 'Booked',
            isPaid: false,
        });
        yield rental.save();
        bike.isAvailable = false;
        yield bike.save({ validateBeforeSave: false });
        res.status(200).json({ success: true, message: 'Bike booked successfully', data: rental });
    }
    catch (error) {
        console.error("Error booking bike:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.bookBike = bookBike;
// const updateRentalStatus = async (rentalId: string): Promise<void> => {
//   await Rental.findByIdAndUpdate(rentalId, { isPaid: true });
// };
// const handlePayment = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { rentalId } = req.params;
//     await updateRentalStatus(rentalId);
//     res.status(200).json({
//       success: true,
//       message: 'Payment successful, rental status updated',
//     });
//   } catch (error) {
//     next(error);
//   }
// };
const handlePayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rentalId } = req.params;
        // Fetch the rental by its ID
        const rental = yield Booking_1.default.findById(rentalId);
        if (!rental) {
            return res.status(404).json({ success: false, message: 'Rental not found' });
        }
        // Check if the rental is already paid
        if (rental.isPaid) {
            return res.status(400).json({ success: false, message: 'Rental already paid' });
        }
        // Mark the rental as paid
        rental.isPaid = true;
        yield rental.save(); // Save the updated rental
        // Return a success response
        res.status(200).json({
            success: true,
            message: 'Payment successful, rental status updated',
            data: rental, // Send back updated rental data
        });
    }
    catch (error) {
        next(error);
    }
});
exports.handlePayment = handlePayment;
const returnBike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Populate bikeId field to get the full Bike document, not just ObjectId
        const rental = yield Booking_1.default.findById(req.params.id).session(session).populate('bikeId');
        if (!rental || rental.isReturned || !rental.bikeId) {
            return res.status(400).json({
                success: false,
                message: 'Rental not found or already returned'
            });
        }
        const currentTime = new Date();
        const rentalDuration = (currentTime.getTime() - rental.startTime.getTime()) / 3600000;
        // Access pricePerHour from the populated bikeId
        const totalCost = Math.ceil(rentalDuration * rental.bikeId.pricePerHour);
        rental.returnTime = currentTime;
        rental.totalCost = totalCost;
        rental.isReturned = true;
        // Make sure the bike is marked as available
        rental.bikeId.isAvailable = true;
        yield rental.save({ session });
        yield rental.bikeId.save({ session });
        yield session.commitTransaction();
        res.json({
            success: true,
            statusCode: 200,
            message: 'Bike returned successfully',
            data: Object.assign(Object.assign({}, rental.toObject()), { totalCost, isPaid: rental.isPaid })
        });
    }
    catch (error) {
        yield session.abortTransaction();
        next(error);
    }
    finally {
        session.endSession();
    }
});
exports.returnBike = returnBike;
const getAllRentalsForUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { isPaid } = req.query;
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }
        const filter = { userId: req.user.userId };
        if (isPaid !== undefined) {
            filter.isPaid = isPaid === 'false';
        }
        const rentals = yield Booking_1.default.find(filter)
            .populate({
            path: 'bikeId',
            select: 'pricePerHour name',
        })
            .exec();
        const populatedRentals = rentals.map(rental => {
            if (rental instanceof Booking_1.default) {
                const rentalObj = rental.toObject();
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
    }
    catch (error) {
        next(error);
    }
});
exports.getAllRentalsForUser = getAllRentalsForUser;
const getAllRentalsForAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Populate bikeId to get the full Bike document
        const rentals = yield Booking_1.default.find().populate('bikeId').lean();
        const validRentals = rentals.filter(rental => rental.bikeId !== null);
        validRentals.forEach(rental => {
            if (rental.bikeId) {
                if (rental.returnTime) {
                    const rentalDuration = (new Date(rental.returnTime).getTime() - new Date(rental.startTime).getTime()) / 3600000;
                    // Access pricePerHour from the populated bikeId
                    rental.totalCost = Math.ceil(rentalDuration * rental.bikeId.pricePerHour);
                }
                else {
                    rental.totalCost = 0;
                }
            }
        });
        res.status(200).json({
            success: true,
            data: validRentals,
        });
    }
    catch (error) {
        console.error('Error fetching rentals:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch rentals.',
        });
    }
});
exports.getAllRentalsForAdmin = getAllRentalsForAdmin;
