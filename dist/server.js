"use strict";
// this is main file
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
// import authRoutes from './routes/auth';
// import userRoutes from './routes/user';
// import bikeRoutes from './routes/bike';
// import rentalRoutes from './routes/rental';
// import notFound from './middlewares/notFound';
// import errorHandler from './middlewares/errorHandler';
// import express from 'express';
// const app = express();
// app.use(express.json());
// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/bikes', bikeRoutes);
// app.use('/api/rentals', rentalRoutes);
// // Middleware
// app.use(notFound);
// app.use(errorHandler);
const app_1 = __importDefault(require("./app"));
const PORT = config_1.default.port || 5000;
const DB_URI = config_1.default.db_url || 'mongodb://localhost:27017/bike-rental';
mongoose_1.default.connect(DB_URI)
    .then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error('Database connection error:', error);
});
