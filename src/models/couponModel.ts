import mongoose, { Document } from 'mongoose';

interface ICoupon extends Document {
  code: string;
  discount: number;
  expirationDate: Date;
}

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
});

const Coupon = mongoose.model<ICoupon>('Coupon', couponSchema);

export default Coupon;
