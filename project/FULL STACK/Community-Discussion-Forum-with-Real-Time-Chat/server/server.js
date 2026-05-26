const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {

  console.log("User Connected");

  socket.on("send_message", (data) => {

    console.log(data);

    socket.broadcast.emit(
      "receive_message",
      data
    );
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });

});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});