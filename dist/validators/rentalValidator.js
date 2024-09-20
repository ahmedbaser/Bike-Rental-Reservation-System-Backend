"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateRental = void 0;
const zod_1 = require("zod");
const createRentalSchema = zod_1.z.object({
    bikeId: zod_1.z.string().min(1),
    startTime: zod_1.z.string().min(1)
});
// here ValidateCreateRental 
const validateCreateRental = (req, res, next) => {
    try {
        createRentalSchema.parse(req.body);
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.errors[0].message
        });
    }
};
exports.validateCreateRental = validateCreateRental;
