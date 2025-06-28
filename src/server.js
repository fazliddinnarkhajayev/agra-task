require('dotenv').config();

const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const { authMiddleware } = require('./middlewares/auth.js');
const { initDB } = require('./database/init.js');
const { initSocket } = require('./sockets/socket-server.js');
const errorHandler = require('./middlewares/errors-handler.js');
const authRoutes = require('./routes/auth-routes.js');
const messageRoutes = require('./routes/messages-routes.js');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // В реальном проекте настроить безопасно
    methods: ["GET", "POST"]
  }
});

// Middlewares
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', authMiddleware, messageRoutes);


// Global Error Handler
app.use(errorHandler);

// DB Init
initDB();

console.log('asd')

// Socket Init
initSocket(io);
app.set('io', io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
