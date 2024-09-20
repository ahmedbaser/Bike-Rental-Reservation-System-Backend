import mongoose, { Schema, Document } from 'mongoose';

interface IBikeRental extends Document {
  name: string;
  description: string;
  pricePerHour: number;
  isAvailable: boolean;
  cc: number;
  year: number;
  model: string;
  brand: string;
  image?: string;
}

interface IRental extends Document {
  userId: mongoose.Types.ObjectId;
  bikeId: mongoose.Types.ObjectId;  
  startTime: Date;
  returnTime?: Date;
  totalCost?: number;
  isReturned: boolean;
  isPaid: boolean;
}

const RentalSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bikeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bike', required: true }, 
  startTime: { type: Date, required: true },
  returnTime: { type: Date },
  totalCost: { type: Number },
  isReturned: { type: Boolean, default: false },
  isPaid: { type: Boolean, default: false },
});

const Rental = mongoose.model<IRental>('IRental', RentalSchema);

export default Rental;




