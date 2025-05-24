import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from "socket.io";


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
const httpServer = app.listen(port, () => {
  console.log(`Server is running on port ${port} 🚀`);
});
const io = new Server(httpServer, { cors: { origin: '*' } });
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  // You can emit notifications here
});


export {app,io};
