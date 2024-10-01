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
const contactController_1 = __importDefault(require("./controllers/contactController"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
const allowedOrigins = ['https://bike-rental-reservation-system-frontend-eosin.vercel.app'
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/users', user_1.default);
app.use('/api/bikes', bike_1.default);
app.use('/api/rentals', rental_1.default);
app.use('/api/payments', paymentRoutes_1.default);
app.use('/api/coupons', couponRoutes_1.default);
app.use('/api', contactController_1.default);
// Root route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the batch-3-assignment-5",
    });
});
// Error handling middleware
app.use(errorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
