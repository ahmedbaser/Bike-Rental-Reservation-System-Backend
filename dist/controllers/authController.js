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
exports.login = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const config_1 = __importDefault(require("../config"));
// singUp part start
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phone, address, role } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = new User_1.default({ name, email, password: hashedPassword, phone, address, role });
        yield user.save();
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'User registered successfully',
            data: user
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signUp = signUp;
// login part start
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, config_1.default.jwt_secret, { expiresIn: '24h' });
        res.json({
            success: true,
            statusCode: 200,
            message: 'User logged in successfully',
            token,
            data: user
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
