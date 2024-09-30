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
exports.createPaymentIntent = void 0;
const stripe_1 = __importDefault(require("stripe"));
const Booking_1 = __importDefault(require("../models/Booking"));
const config_1 = __importDefault(require("../config"));
const stripe = new stripe_1.default(config_1.default.stripe_secret_key, { apiVersion: '2024-06-20' });
const createPaymentIntent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rentalId } = req.body;
        const rental = yield Booking_1.default.findById(rentalId).populate('bikeId');
        if (!rental || rental.isReturned) {
            return res.status(400).json({
                success: false,
                message: 'Rental not found or already returned'
            });
        }
        if (rental.totalCost === null || rental.totalCost === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Total cost is not available for this rental'
            });
        }
        const amount = 100;
        const paymentIntent = yield stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            metadata: { rentalId },
        });
        res.json({
            success: true,
            statusCode: 200,
            message: 'Payment Intent created successfully',
            clientSecret: paymentIntent.client_secret,
        });
    }
    catch (error) {
        // Handle Stripe-specific errors
        if (error instanceof stripe_1.default.errors.StripeError) {
            return res.status(500).json({
                success: false,
                message: `Stripe error: ${error.message}`,
            });
        }
        next(error);
    }
});
exports.createPaymentIntent = createPaymentIntent;
