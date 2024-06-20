import { Schema, model, Document } from 'mongoose';

interface IBike extends Document {
    name: string;
    description: string;
    pricePerHour: number;
    isAvailable: boolean;
    cc: number;
    year: number;
    model: string;
    brand: string;
}

const bikeSchema = new Schema<IBike>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    cc: { type: Number, required: true },
    year: { type: Number, required: true },
    model: { type: String, required: true },
    brand: { type: String, required: true }
}, { timestamps: true });

const Bike = model<IBike>('Bike', bikeSchema);
export default Bike;


