"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
// Authenticate middleware
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.',
        });
    }
    try {
        if (!config_1.default.jwt_secret) {
            throw new Error('JWT secret is missing in config.');
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        console.log('Decoded token:', decoded);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error('Invalid token:', error);
        res.status(400).json({
            success: false,
            message: 'Invalid token.',
        });
    }
};
exports.authenticate = authenticate;
// Authorize middleware
const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. No user found in request.',
            });
        }
        if (!roles || roles.length === 0) {
            console.error('No roles provided to authorize.');
            return res.status(500).json({
                success: false,
                message: 'Internal server error. No roles to authorize.',
            });
        }
        if (!roles.includes(req.user.role)) {
            console.log(`Role mismatch: expected ${roles}, got ${req.user.role}`);
            return res.status(403).json({
                success: false,
                message: 'Access denied. Role mismatch.',
            });
        }
        next();
    };
};
exports.authorize = authorize;
