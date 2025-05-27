import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: '*', // Allow all origins for testing (consider changing for production)
  })
);

// MongoDB Connection
const uri = process.env.MONGO_URL;
mongoose
  .connect(uri)
  .then(() => console.log('MongoDB connected successfully 🐸'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// HTTP server and Socket.IO
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

const userSocketMap = new Map(); // userId -> socketId

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap.set(userId, socket.id);
    console.log(`User ${userId} connected with socket ID ${socket.id}`);
  }

  socket.on('disconnect', () => {
    if (userId) {
      userSocketMap.delete(userId);
      console.log(`User ${userId} disconnected`);
    }
  });
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port} 🚀`);
});

export { app, io, userSocketMap };
