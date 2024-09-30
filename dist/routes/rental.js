"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rentalController_1 = require("../controllers/rentalController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.put('/return/:id', auth_1.authenticate, (0, auth_1.authorize)(['admin']), rentalController_1.returnBike);
router.get('/', auth_1.authenticate, rentalController_1.getAllRentalsForUser);
router.post('/book', auth_1.authenticate, (0, auth_1.authorize)(['user']), rentalController_1.bookBike);
router.post('/pay/:rentalId', auth_1.authenticate, (0, auth_1.authorize)(['user']), rentalController_1.handlePayment);
router.get('/admin', auth_1.authenticate, (0, auth_1.authorize)(['admin']), rentalController_1.getAllRentalsForAdmin);
exports.default = router;
