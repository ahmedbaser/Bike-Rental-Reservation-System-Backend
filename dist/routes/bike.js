"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bikeController_1 = require("../controllers/bikeController");
const auth_1 = require("../middlewares/auth");
const bikeValidator_1 = require("../validators/bikeValidator");
const router = express_1.default.Router();
router.post('/', auth_1.authenticate, (0, auth_1.authorize)('admin'), bikeValidator_1.validateCreateBike, bikeController_1.createBike);
router.get('/', bikeController_1.getAllBikes);
router.put('/:id', auth_1.authenticate, (0, auth_1.authorize)('admin'), bikeValidator_1.validateUpdateBike, bikeController_1.updateBike);
router.delete('/:id', auth_1.authenticate, (0, auth_1.authorize)('admin'), bikeController_1.deleteBike);
exports.default = router;
