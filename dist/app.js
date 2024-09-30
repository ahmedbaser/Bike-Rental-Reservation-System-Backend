"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const bike_1 = __importDefault(require("./routes/bike"));
const rental_1 = __importDefault(require("./routes/rental"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const couponRoutes_1 = __importDefault(require("./routes/couponRoutes"));
// import paidRoutes from './routes/paidRoute'
const contactController_1 = __importDefault(require("./controllers/contactController"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'PATCH'],
    credentials: true,
}));
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/users', user_1.default);
app.use('/api/bikes', bike_1.default);
app.use('/api/rentals', rental_1.default);
app.use('/api/payments', paymentRoutes_1.default);
app.use('/api/coupons', couponRoutes_1.default);
// app.use('/api/rentals/mark-as-paid', paidRoutes);
app.use('/api', contactController_1.default);
// Middleware
// Root route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the batch-3-assignment-5",
    });
});
app.use(errorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
