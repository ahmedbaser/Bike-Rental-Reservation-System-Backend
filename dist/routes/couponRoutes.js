"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const couponController_1 = require("../controllers/couponController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
// Admin-only access for managing coupons
router.post('/', auth_1.authenticate, (0, auth_1.authorize)(['admin']), couponController_1.createCoupon);
router.get('/', auth_1.authenticate, (0, auth_1.authorize)(['admin']), couponController_1.getCoupons);
router.patch('/:id', auth_1.authenticate, (0, auth_1.authorize)(['admin']), couponController_1.updateCoupon);
router.delete('/:id', auth_1.authenticate, (0, auth_1.authorize)(['admin']), couponController_1.deleteCoupon);
exports.default = router;
