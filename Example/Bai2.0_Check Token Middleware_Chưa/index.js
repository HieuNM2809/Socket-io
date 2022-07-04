var express = require('express');
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);

io.on("connection", function (socket) {
    console.log("co ng truy cap: " + socket.id);

    const engine = socket.io.engine;
    console.log(engine.transport.name); // in most cases, prints "polling"
  
    engine.once("upgrade", () => {
      // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
      console.log(engine.transport.name); // in most cases, prints "websocket"
    });
  
    engine.on("packet", ({ type, data }) => {
      // called for each packet received
    });
  
    engine.on("packetCreate", ({ type, data }) => {
      // called for each packet sent
    });
  
    engine.on("drain", () => {
      // called when the write buffer is drained
    });
  
    engine.on("close", (reason) => {
      // called when the underlying connection is closed
    });
    
    socket.on("disconnect", function () {
        console.log(socket.id + " ngat ket noiiiii");
    });
});

app.get("/home", function (req, res) {
    res.render("trangchu");
});

server.listen(3000);


