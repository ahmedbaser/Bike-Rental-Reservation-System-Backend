"use strict";
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
exports.getAllRentalsForUser = exports.returnBike = exports.createRental = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Booking_1 = __importDefault(require("../models/Booking"));
const Bike_1 = __importDefault(require("../models/Bike"));
// createRental part start
const createRental = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { bikeId, startTime } = req.body;
        const userId = req.user.userId;
        const bike = yield Bike_1.default.findById(bikeId).session(session);
        if (!bike || !bike.isAvailable) {
            return res.status(400).json({
                success: false,
                message: 'Bike is not available for rental'
            });
        }
        const rental = new Booking_1.default({ userId, bikeId, startTime });
        bike.isAvailable = false;
        yield rental.save({ session });
        yield bike.save({ session });
        yield session.commitTransaction();
        res.json({
            success: true,
            statusCode: 200,
            message: 'Rental created successfully',
            data: rental
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
exports.createRental = createRental;
// returnBike part start
const returnBike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const rental = yield Booking_1.default.findById(req.params.id).session(session).populate('bikeId');
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
        const bike = yield Bike_1.default.findById(rental.bikeId._id).session(session);
        bike.isAvailable = true;
        yield rental.save({ session });
        yield bike.save({ session });
        yield session.commitTransaction();
        res.json({
            success: true,
            statusCode: 200,
            message: 'Bike returned successfully',
            data: rental // Ensure totalCost is included in the response
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
// getAllRentalsForUser part start
const getAllRentalsForUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rentals = yield Booking_1.default.find({ userId: req.user.userId }).populate('bikeId');
        // Calculate totalCost for each rental
        rentals.forEach(rental => {
            if (rental.returnTime) {
                const rentalDuration = (rental.returnTime.getTime() - rental.startTime.getTime()) / 3600000;
                rental.totalCost = Math.ceil(rentalDuration * rental.bikeId.pricePerHour);
            }
            else {
                rental.totalCost = 0; // Handle rentals that haven't been returned yet
            }
        });
        res.json({
            success: true,
            statusCode: 200,
            message: 'Rentals retrieved successfully',
            data: rentals
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllRentalsForUser = getAllRentalsForUser;
