"use strict";
// import express, {Request, Response} from "express";
// const app = express()
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World this!')
// })
// export default app;
const express_1 = __importDefault(require("express"));
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
// Root route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the batch-3-assignment3",
    });
});
exports.default = app;
