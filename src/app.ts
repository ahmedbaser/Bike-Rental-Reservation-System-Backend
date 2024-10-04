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
import contactUsSection from './controllers/contactController';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(bodyParser.json());



const allowedOrigins = ['https://bike-rental-reservation-system-frontend-eosin.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));




// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bikes', bikeRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api', contactUsSection);

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the batch-3-assignment-5",
  });
});

// Error handling middleware
app.use(errorHandler);
app.use(notFound);

export default app;
