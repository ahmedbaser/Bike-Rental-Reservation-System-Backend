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
exports.getAllRentals = exports.returnBike = exports.createRental = void 0;
const Booking_1 = __importDefault(require("../models/Booking"));
const Bike_1 = __importDefault(require("../models/Bike"));
const validatorsUtils_1 = require("../utils/validatorsUtils");
const createRental = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedData = validatorsUtils_1.bookingSchema.parse(req.body);
        const { bikeId, startTime } = parsedData;
        const bike = yield Bike_1.default.findById(bikeId);
        if (!bike || !bike.isAvailable) {
            return res.status(400).json({
                success: false,
                message: 'Bike is not available'
            });
        }
        bike.isAvailable = false;
        yield bike.save();
        const newBooking = new Booking_1.default({
            userId: req.user.id,
            bikeId,
            startTime,
            totalCost: 0
        });
        const booking = yield newBooking.save();
        res.status(201).json({
            success: true,
            message: 'Rental created successfully',
            data: booking
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Validation Error',
            errorMessages: error.errors || [{ path: '', message: error.message }]
        });
    }
});
exports.createRental = createRental;
const returnBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield Booking_1.default.findById(req.params.id);
        if (!booking || booking.isReturned) {
            return res.status(400).json({
                success: false,
                message: 'Invalid booking'
            });
        }
        const bike = yield Bike_1.default.findById(booking.bikeId);
        if (!bike) {
            return res.status(400).json({
                success: false,
                message: 'Bike not found'
            });
        }
        booking.returnTime = new Date();
        const rentalDuration = (booking.returnTime.getTime() - booking.startTime.getTime()) / (1000 * 60 * 60); // in hours
        booking.totalCost = rentalDuration * bike.pricePerHour;
        booking.isReturned = true;
        yield booking.save();
        bike.isAvailable = true;
        yield bike.save();
        res.status(200).json({
            success: true,
            message: 'Bike returned successfully',
            data: booking
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            errorMessages: [{ path: '', message: error.message }]
        });
    }
});
exports.returnBike = returnBike;
const getAllRentals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rentals = yield Booking_1.default.find({ userId: req.user.id });
        res.status(200).json({
            success: true,
            message: 'Rentals retrieved successfully',
            data: rentals
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            errorMessages: [{ path: '', message: error.message }]
        });
    }
});
exports.getAllRentals = getAllRentals;
