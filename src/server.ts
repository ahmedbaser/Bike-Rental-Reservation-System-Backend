




// this is main file
import express from 'express';
import mongoose from 'mongoose';
import config from './config';

import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import bikeRoutes from './routes/bike';
import rentalRoutes from './routes/rental';
import notFound from './middlewares/notFound';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bikes', bikeRoutes);
app.use('/api/rentals', rentalRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = config.port || 5000;
const DB_URI = config.db_url || 'mongodb://localhost:27017/bike-rental';

mongoose.connect(DB_URI,)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

  