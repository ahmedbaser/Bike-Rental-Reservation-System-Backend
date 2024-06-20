"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get('/me', auth_1.authenticate, (0, auth_1.authorize)('admin', 'user'), userController_1.getUserProfile);
router.put('/me', auth_1.authenticate, userController_1.updateUserProfile);
exports.default = router;
