"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateBike = exports.validateCreateBike = void 0;
const zod_1 = require("zod");
const createBikeSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    pricePerHour: zod_1.z.number().min(1),
    isAvailable: zod_1.z.boolean().optional().default(true),
    cc: zod_1.z.number().min(1),
    year: zod_1.z.number().min(1900),
    model: zod_1.z.string().min(1),
    brand: zod_1.z.string().min(1),
    image: zod_1.z.string().min(1),
});
const updateBikeSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().min(1).optional(),
    pricePerHour: zod_1.z.number().min(1).optional(),
    isAvailable: zod_1.z.boolean().optional(),
    cc: zod_1.z.number().min(1).optional(),
    year: zod_1.z.number().min(1900).optional(),
    model: zod_1.z.string().min(1).optional(),
    brand: zod_1.z.string().min(1).optional(),
    image: zod_1.z.string().min(1).optional()
});
const validateCreateBike = (req, res, next) => {
    try {
        createBikeSchema.parse(req.body);
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.errors[0].message
        });
    }
};
exports.validateCreateBike = validateCreateBike;
const validateUpdateBike = (req, res, next) => {
    try {
        updateBikeSchema.parse(req.body);
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.errors[0].message
        });
    }
};
exports.validateUpdateBike = validateUpdateBike;
