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
exports.searchBikes = exports.deleteBike = exports.updateBike = exports.getAllBikes = exports.getBikeById = exports.createBike = void 0;
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
const getBikeById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bike = yield Bike_1.default.findById(req.params.id);
        if (!bike) {
            return res.status(404).json({
                success: false,
                message: 'Bike not found'
            });
        }
        res.json({
            success: true,
            statusCode: 200,
            message: 'Bike retrieved successfully',
            data: bike,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getBikeById = getBikeById;
// getAllBikes part start
const getAllBikes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { brand, model } = req.query;
        const filter = {};
        if (brand)
            filter.brand = brand;
        if (model)
            filter.model = model;
        const bikes = yield Bike_1.default.find(filter);
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
const searchBikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchQuery = req.query.q;
    try {
        const bikes = yield Bike_1.default.find({ name: new RegExp(searchQuery, 'i') });
        if (bikes.length === 0) {
            return res.json({ success: true, message: 'No bikes found', bikes: [] });
        }
        res.json({ success: true, bikes });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.searchBikes = searchBikes;
