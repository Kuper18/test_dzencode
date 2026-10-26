const express = require("express");
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: "http://localhost:5173",
}));

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
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

server.listen(8001, () => {
    console.log("Socket.IO server running on port 8001");
});
