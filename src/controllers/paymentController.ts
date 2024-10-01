import { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';
import Rental from '../models/Booking';
import config from '../config';


const stripe = new Stripe(config.stripe_secret_key as string, { apiVersion: '2024-06-20' }); 

const createPaymentIntent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rentalId } = req.body;
    const rental = await Rental.findById(rentalId).populate('bikeId');

    if (!rental || rental.isReturned) {
      return res.status(400).json({
        success: false,
        message: 'Rental not found or already returned',
      });
    }

    console.log('Rental Total Cost:', rental.totalCost);

    if (rental.totalCost === null || rental.totalCost === undefined || rental.totalCost <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Total cost is not available or is invalid for this rental',
      });
    }

    const amount = rental.totalCost * 100; 

    const paymentIntent = await stripe.paymentIntents.create({
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
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      return res.status(500).json({
        success: false,
        message: `Stripe error: ${error.message}`,
      });
    }

    next(error);
  }
};

export {createPaymentIntent};
