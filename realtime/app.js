const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 8001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: CORS_ORIGIN,
}));

const io = new Server(server, {
  cors: {
    origin: CORS_ORIGIN,
    methods: ["GET", "POST"],
  },
});

function broadcastActiveSessions() {
  io.emit("active-sessions:update", {
    count: io.of("/").sockets.size,
  });
}

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  broadcastActiveSessions();

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);

    broadcastActiveSessions();
  });
});

server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
