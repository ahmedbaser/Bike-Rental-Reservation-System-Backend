"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateSignUp = void 0;
const zod_1 = require("zod");
const signUpSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    phone: zod_1.z.string().min(10).max(15),
    address: zod_1.z.string().min(1),
    role: zod_1.z.string().optional()
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
const validateSignUp = (req, res, next) => {
    try {
        signUpSchema.parse(req.body);
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.errors[0].message
        });
    }
};
exports.validateSignUp = validateSignUp;
const validateLogin = (req, res, next) => {
    try {
        loginSchema.parse(req.body);
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.errors[0].message
        });
    }
};
exports.validateLogin = validateLogin;
