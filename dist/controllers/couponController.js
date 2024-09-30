"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCoupon = exports.updateCoupon = exports.getCoupons = exports.createCoupon = void 0;
const couponModel_1 = __importDefault(require("../models/couponModel"));
// Create a new coupon
const createCoupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, discount, expirationDate } = req.body;
        const existingCoupon = yield couponModel_1.default.findOne({ code });
        if (existingCoupon) {
            return res.status(400).json({
                success: false,
                message: 'Coupon code already exists.',
            });
        }
        const newCoupon = new couponModel_1.default({ code, discount, expirationDate });
        yield newCoupon.save();
        res.status(201).json({
            success: true,
            message: 'Coupon created successfully',
            data: newCoupon,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating coupon',
            error: error.message,
        });
    }
});
exports.createCoupon = createCoupon;
// Get all coupons
const getCoupons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coupons = yield couponModel_1.default.find();
        res.status(200).json({
            success: true,
            data: coupons,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching coupons',
            error: error.message,
        });
    }
});
exports.getCoupons = getCoupons;
// Update a coupon
const updateCoupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { code, discount, expirationDate } = req.body;
        const coupon = yield couponModel_1.default.findById(id);
        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: 'Coupon not found',
            });
        }
        coupon.code = code;
        coupon.discount = discount;
        coupon.expirationDate = expirationDate;
        yield coupon.save();
        res.status(200).json({
            success: true,
            message: 'Coupon updated successfully',
            data: coupon,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating coupon',
            error: error.message,
        });
    }
});
exports.updateCoupon = updateCoupon;
// Delete a coupon
const deleteCoupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield couponModel_1.default.findByIdAndDelete(id);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting coupon',
            error: error.message,
        });
    }
});
exports.deleteCoupon = deleteCoupon;
