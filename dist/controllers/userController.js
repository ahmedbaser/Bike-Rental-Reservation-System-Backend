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
exports.getAllUsers = exports.promoteUserToAdmin = exports.deleteUser = exports.userRentals = exports.updateUserProfile = exports.getUserProfile = void 0;
const User_1 = __importDefault(require("../models/User"));
const Rental_1 = __importDefault(require("../models/Rental"));
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
        const { name, email, phone, address } = req.body;
        const user = yield User_1.default.findByIdAndUpdate(req.user.userId, { name, phone, email, address }, { new: true });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
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
// get all users start
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        res.json({
            success: true,
            statusCode: 200,
            message: 'All users retrieved successfully',
            data: users,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
// deleteUser start
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield User_1.default.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        res.json({
            success: true,
            statusCode: 200,
            message: 'User deleted successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
// promoteUserToAdmin start
const promoteUserToAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield User_1.default.findByIdAndUpdate(userId, { role: 'admin' }, { new: true });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        res.json({
            success: true,
            statusCode: 200,
            message: 'User promoted to admin successfully',
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.promoteUserToAdmin = promoteUserToAdmin;
const userRentals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find rentals for the authenticated user
        const rentals = yield Rental_1.default.find({ userId: req.user.userId }).populate('bikeId');
        if (!rentals) {
            return res.status(404).json({ message: 'No rentals found for this user.' });
        }
        res.status(200).json({ success: true, data: rentals });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.userRentals = userRentals;
