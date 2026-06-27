// backend/config/socketConfig.js

const { Server } = require("socket.io");

const createSocketServer = (httpServer, allowedOrigins) => {
  const io = new Server(httpServer, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    const { isConnected } = require("../services/angelOneState");
    const { getCurrentPrices } = require("../services/priceEngine");
    socket.emit("connectionStatus", { isLive: isConnected() });
    socket.emit("priceUpdate", getCurrentPrices());
    socket.on("disconnect", () => console.log("User disconnected"));
  });

  return io;
};

module.exports = { createSocketServer };