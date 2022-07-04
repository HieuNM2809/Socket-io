var express = require('express');
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views","./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
const registerTestHandlers = require("./function/test");

const onConnection = (socket) => {
    registerTestHandlers(io, socket);
};
io.on("connection", onConnection);


app.get("/", function (req, res) {
    res.render("trangchu");    
});

server.listen(3000);



//https://socket.io/docs/v4/server-application-structure/
