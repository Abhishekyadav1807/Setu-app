import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import lawRoutes from './routes/laws.js';
import procedureRoutes from './routes/procedures.js';
import schemeRoutes from './routes/schemes.js';
import documentRoutes from './routes/documents.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/laws', lawRoutes);
app.use('/api/procedures', procedureRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/documents', documentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SETU API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 SETU Backend running on http://localhost:${PORT}`);
});
