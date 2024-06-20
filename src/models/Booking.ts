


import { Schema, model, Document, Types } from 'mongoose';

interface IRental extends Document {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime: Date | null;
  totalCost: number | null;
  isReturned: boolean;
}

const rentalSchema = new Schema<IRental>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bikeId: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
  startTime: { type: Date, required: true },
  returnTime: { type: Date, default: null },
  totalCost: { type: Number, default: 0 },
  isReturned: { type: Boolean, default: false },
},{ timestamps: true });

const Rental = model<IRental>('Rental', rentalSchema);

export default Rental;
