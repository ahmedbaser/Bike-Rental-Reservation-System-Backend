"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rentalController_1 = require("../controllers/rentalController");
const auth_1 = require("../middlewares/auth");
const rentalValidator_1 = require("../validators/rentalValidator");
const router = express_1.default.Router();
router.post('/', auth_1.authenticate, rentalValidator_1.validateCreateRental, rentalController_1.createRental);
router.put('/:id/return', auth_1.authenticate, (0, auth_1.authorize)('admin'), rentalController_1.returnBike);
router.get('/', auth_1.authenticate, rentalController_1.getAllRentalsForUser);
exports.default = router;
