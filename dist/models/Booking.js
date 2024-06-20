"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const rentalSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    bikeId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Bike', required: true },
    startTime: { type: Date, required: true },
    returnTime: { type: Date, default: null },
    totalCost: { type: Number, default: 0 },
    isReturned: { type: Boolean, default: false },
}, { timestamps: true });
const Rental = (0, mongoose_1.model)('Rental', rentalSchema);
exports.default = Rental;
