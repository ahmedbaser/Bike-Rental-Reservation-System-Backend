"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingSchema = exports.userUpdateSchema = exports.loginSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    phone: zod_1.z.string().min(10),
    address: zod_1.z.string().min(5),
    role: zod_1.z.enum(['admin', 'user']).optional()
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
exports.userUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    phone: zod_1.z.string().min(10).optional(),
    address: zod_1.z.string().min(5).optional()
});
exports.bookingSchema = zod_1.z.object({
    bikeId: zod_1.z.string(),
    startTime: zod_1.z.string().datetime()
});
