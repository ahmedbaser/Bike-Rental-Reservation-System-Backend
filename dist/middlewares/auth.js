"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
// authenicate part start
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    console.log(token);
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied.No token provided.',
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        console.log("decoded token", decoded);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Invalid token.',
        });
    }
};
exports.authenticate = authenticate;
// authorize part start
const authorize = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(403).json({
                success: false,
                message: 'Access denied.'
            });
        }
        if (req.user.role !== role) {
            console.log(`Role mismatch: expected ${role}, got ${req.user.role}`);
            return res.status(403).json({
                success: false,
                message: 'Access denied.'
            });
        }
        next();
    };
};
exports.authorize = authorize;
