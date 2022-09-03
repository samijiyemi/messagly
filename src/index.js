// require necessary dependencies
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

// initialize the express app
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
// serve the public file using express middleware
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("index.html");
});

let count = 0;

// start the socket.io connection
io.on("connection", function (socket) {
  io.emit("user connected");
  socket.on("message", function (msg) {
    io.emit("message", msg);
  });
});

server.listen(port, () => {
  console.log(`server runing on port ${port}`);
});
