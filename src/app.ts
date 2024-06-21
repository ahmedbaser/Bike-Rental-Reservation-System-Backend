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


// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the batch-3-assignment-3",
  });
});
app.use(errorHandler);
app.use(notFound);

export default app;