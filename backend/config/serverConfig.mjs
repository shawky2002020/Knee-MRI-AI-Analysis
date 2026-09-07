import express from 'express';
import { initializeApp, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';

const envDemoPath = path.join(__dirname, '../.env.demo');
if (process.env.DEMO_MODE === 'true' || process.env.NODE_ENV === 'demo') {
  if (fs.existsSync(envDemoPath)) {
    dotenv.config({ path: envDemoPath, override: true });
  }
} else {
  dotenv.config();
}

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

import { localDb } from './localDbAdapter.mjs';

// Database Connection (Local Demo vs Remote Firebase)
let db;
const useLocalDb = process.env.DEMO_MODE === 'true' || process.env.USE_LOCAL_DB === 'true' || process.env.NODE_ENV === 'demo';

if (useLocalDb) {
  console.log('Using Isolated Local Demo Database (zero latency, offline) 🛡️');
  db = localDb;
} else {
  let appInstance;
  let serviceAccount;

  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (err) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT env var:', err);
    }
  } else {
    const keyPath = path.join(__dirname, 'serviceAccountKey.json');
    if (fs.existsSync(keyPath)) {
      try {
        serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
      } catch (err) {
        console.error('Failed to read serviceAccountKey.json file:', err);
      }
    }
  }

  try {
    if (serviceAccount) {
      appInstance = initializeApp({
        credential: cert(serviceAccount),
        databaseURL: process.env.DATABASE_URL
      });
      console.log('Firebase Admin SDK connected successfully 🔥');
      db = getDatabase();
    } else {
      console.warn('Firebase Admin SDK initialization skipped: Using local database.');
      db = localDb;
    }
  } catch (err) {
    console.error('Firebase Admin SDK connection failed, falling back to local DB:', err.message);
    db = localDb;
  }
}

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

export { app, io, db, userSocketMap };
