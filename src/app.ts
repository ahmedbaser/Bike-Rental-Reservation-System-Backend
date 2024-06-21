// import express, {Request, Response} from "express";
// const app = express()


// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World this!')
// })

// export default app;

import express from 'express';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import bikeRoutes from './routes/bike';
import rentalRoutes from './routes/rental';
import notFound from './middlewares/notFound';
import errorHandler from './middlewares/errorHandler';
const app = express()
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bikes', bikeRoutes);
app.use('/api/rentals', rentalRoutes);
// Middleware
app.use(notFound);
app.use(errorHandler);
// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the batch-3-assignment3",
  });
});
export default app;