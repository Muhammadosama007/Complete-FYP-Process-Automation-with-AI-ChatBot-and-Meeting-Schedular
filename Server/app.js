import express from 'express';
import cors from 'cors';
import Routes from './routes/index.js';
import ApiError from './utils/api-error.js';
import globalErrorHandler from './middlewares/globalErrorHandler.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Routes
app.use('/api', Routes);

// Test route
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Server is working 🚀' });
});

// 404 Not Found Handler
app.use((req, res, next) => {
  next(new ApiError(404, 'Route Not Found'));
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
