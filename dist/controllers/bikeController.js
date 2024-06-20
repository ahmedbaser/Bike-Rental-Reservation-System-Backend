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
exports.deleteBike = exports.updateBike = exports.getAllBikes = exports.createBike = void 0;
const Bike_1 = __importDefault(require("../models/Bike"));
// create part start
const createBike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bike = new Bike_1.default(req.body);
        yield bike.save();
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'Bike added successfully',
            data: bike
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.createBike = createBike;
// getAllBikes part start
const getAllBikes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bikes = yield Bike_1.default.find();
        if (bikes.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No Data Found',
                data: []
            });
        }
        res.json({
            success: true,
            statusCode: 200,
            message: 'Bikes retrieved successfully',
            data: bikes
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllBikes = getAllBikes;
//update part start
const updateBike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bike = yield Bike_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({
            success: true,
            statusCode: 200,
            message: 'Bike updated successfully',
            data: bike
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateBike = updateBike;
// delete part start
const deleteBike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bike = yield Bike_1.default.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            statusCode: 200,
            message: 'Bike deleted successfully',
            data: bike
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBike = deleteBike;
