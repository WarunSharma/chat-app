import express from 'express';
import authRoutes from './routes/auth.routes.js';
import connectDB from './lib/db.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB();
const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})