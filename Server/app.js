import express from 'express';
import cors from 'cors';
import Routes from './routes/index.js';
import ApiError from './utils/api-error.js';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// ✅ Serve templates statically
app.use('/templates', express.static(path.join(__dirname, 'templates')));

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
