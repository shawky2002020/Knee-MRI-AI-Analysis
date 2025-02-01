import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: "*", // Allow all origins for testing
  })
);

// Connect to database
const uri = process.env.MONGO_URL;

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected successfully 🐸'))
  .catch((err) => console.error('MongoDB connection failed:', err));


// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port} 🚀`);
});

export default app;
