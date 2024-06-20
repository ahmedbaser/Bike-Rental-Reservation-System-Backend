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
exports.updateUserProfile = exports.getUserProfile = void 0;
const User_1 = __importDefault(require("../models/User"));
// getUserProfile start
const getUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        res.json({
            success: true,
            statusCode: 200,
            message: 'User profile retrieved successfully',
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserProfile = getUserProfile;
// updateUserProfile start
const updateUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone } = req.body;
        const user = yield User_1.default.findByIdAndUpdate(req.user.userId, { name, phone }, { new: true });
        res.json({
            success: true,
            statusCode: 200,
            message: 'Profile updated successfully',
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUserProfile = updateUserProfile;
