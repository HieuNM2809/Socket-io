const express = require('express');
const { Server } = require("socket.io");
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);

// return view 
app.get('/', (req, res) => {
   res.sendFile(__dirname + '/pages/index.html');
});

// kết nối 
io.on('connection', (socket) => {
   
  //user kết nối
  console.log('a user connected: ' + socket.id);

  socket.broadcast.emit('hi ádasd');

  // chat message
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);  // gửi message đến mn
  });


  // ngắt kết nối
  socket.on('disconnect', function () {
     console.log('a user disconnect: ' + socket.id);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});