let io;
const userSockets = new Map();

function initSocket(server) {
  io = server;

  io.on('connection', (socket) => {
    const token = socket.handshake.auth.token;
    if (!token) return socket.disconnect();

    try {
      const jwt = require('jsonwebtoken');
      const user = jwt.verify(token, process.env.JWT_SECRET);
      userSockets.set(user.id, socket.id);

      console.log(`User ${user.username} connected`);

      socket.on('disconnect', () => {
        userSockets.delete(user.id);
        console.log(`User ${user.username} disconnected`);
      });
    } catch (err) {
      socket.disconnect();
    }
  });
}

function  notifyUser(receiverId, message) {
  const socketId = userSockets.get(parseInt(receiverId));
  if (socketId && io) {
    io.to(socketId).emit('new_message', message);
  }
}

module.exports = { initSocket, notifyUser };
