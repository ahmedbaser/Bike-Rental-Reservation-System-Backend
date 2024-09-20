import { Request, Response } from 'express';
import Coupon from '../models/couponModel';

// Create a new coupon
export const createCoupon = async (req: Request, res: Response) => {
  try {
    const { code, discount, expirationDate } = req.body;

    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({
        success: false,
        message: 'Coupon code already exists.',
      });
    }

    const newCoupon = new Coupon({ code, discount, expirationDate });
    await newCoupon.save();

    res.status(201).json({
      success: true,
      message: 'Coupon created successfully',
      data: newCoupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating coupon',
      error: error.message,
    });
  }
};

// Get all coupons
export const getCoupons = async (req: Request, res: Response) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json({
      success: true,
      data: coupons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching coupons',
      error: error.message,
    });
  }
};

// Update a coupon
export const updateCoupon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { code, discount, expirationDate } = req.body;

    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found',
      });
    }

    coupon.code = code;
    coupon.discount = discount;
    coupon.expirationDate = expirationDate;

    await coupon.save();

    res.status(200).json({
      success: true,
      message: 'Coupon updated successfully',
      data: coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating coupon',
      error: error.message,
    });
  }
};


// Delete a coupon
export const deleteCoupon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await Coupon.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Coupon deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting coupon',
      error: error.message,
    });
  }
};
