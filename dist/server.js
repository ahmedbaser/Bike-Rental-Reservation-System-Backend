"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// this is main file
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const bike_1 = __importDefault(require("./routes/bike"));
const rental_1 = __importDefault(require("./routes/rental"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/users', user_1.default);
app.use('/api/bikes', bike_1.default);
app.use('/api/rentals', rental_1.default);
// Middleware
app.use(notFound_1.default);
app.use(errorHandler_1.default);
const PORT = config_1.default.port || 5000;
const DB_URI = config_1.default.db_url || 'mongodb://localhost:27017/bike-rental';
mongoose_1.default.connect(DB_URI)
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error('Database connection error:', error);
});
