import cors from 'cors';
import express from 'express';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import bikeRoutes from './routes/bike';
import rentalRoutes from './routes/rental';
import notFound from './middlewares/notFound';
import errorHandler from './middlewares/errorHandler';
import paymentRoutes from './routes/paymentRoutes';
import couponRoutes from './routes/couponRoutes';
import paidRoutes from './routes/paidRoute'
import contactUsSection from './controllers/contactController';


const app = express()
app.use(express.json());


app.use(cors({
  origin: 'http://localhost:5173',  
  methods: ['GET', 'POST', 'PUT', 'DELETE','UPDATE','PATCH'], 
  credentials: true,
}));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bikes', bikeRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/rentals/mark-as-paid', paidRoutes);
app.use('/api', contactUsSection);
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