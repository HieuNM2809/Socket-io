var express = require('express');
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views","./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);

io.on("connection" ,function (socket) {
    console.log("co ng truy cap: " + socket.id);


    socket.on('client-send-val', (msg) =>{
        console.log(msg);

        socket.broadcast.emit('server-send-val',msg);
    });


    socket.on("disconnect",function () {
        console.log(socket.id + " ngat ket noiiiii");
    });
})

app.get("/", function (req, res) {
    res.render("trangchu");    
});

server.listen(3000);


// layout chat : https://www.bootdey.com/snippets/view/chat-app

//https://freefrontend.com/bootstrap-chats/
//https://us.niemvuilaptrinh.com/article/examples-of-chat-box-design-html-css
//https://csshint.com/html-css-chat-box-designs/