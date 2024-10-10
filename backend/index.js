import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import userRouter from './routes/users.route.js';
import productRouter from './routes/products.route.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import reviewRouter from './routes/reviews.route.js';

// app configuration
const app = express();
dotenv.config();
const port = process.env.PORT || 5000
connectDB(); // Database connection

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
})); // we can access the backend from any frontend

// api endpoint
app.use('/api/auth', userRouter);
app.use('/api/products', productRouter);
app.use('/api/reviews', reviewRouter);

// Error handlers middleware
app.use(errorMiddleware);


// port Listener
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));