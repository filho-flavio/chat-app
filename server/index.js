const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`)
  });

  //
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  })

  io.on("disconnect", (socket) => {
    console.log("Client disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
