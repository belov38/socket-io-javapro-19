const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/index.js', (req, res) => {
  res.sendFile(__dirname + '/client/index.js');
});


io.on('connection', (socket) => {
  socket.join("room1");
  io.to("room1").emit("chat",`Добро пожаловать! ${socket.client.id}`)

  socket.on("hello", (arg) => {
    console.log("arg:", arg);
    socket.emit("newmsg", 'param 1', 2, {sampleObject:'hello world'})
  });

  socket.on("chat", (arg) => {
    console.log('New chat message:', arg)
    io.to("room1").emit("chat",arg);
  })

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
