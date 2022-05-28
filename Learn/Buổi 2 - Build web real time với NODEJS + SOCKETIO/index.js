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

        //1. send val all client            => người gửi và gửi cho tất cả mọi người 
        // io.sockets.emit('server-send-val', socket.id + ' : '+msg);

        //2. send val to me                 => ai gửi thì người đó nhận 
        //socket.emit('server-send-val', socket.id + ' : '+msg);


        //3. send val all client but me     => gửi cho tất cả mọi người trừ người gửi 
        //socket.broadcast.emit('server-send-val', socket.id+ ' : ' + msg);


        //VD : . chỉnh messge người gửi bên phải 
            // css trả về chính ngưởi gửi
        socket.emit('server-send-val', '<li style="text-align: end;">'+msg+'</li>');
        
            // css trả về những người còn lại
        socket.broadcast.emit('server-send-val', '<li style="text-align: start;">'+msg+'</li>');
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