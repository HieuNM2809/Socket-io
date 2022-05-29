var express = require('express');
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views","./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);

var arrayUser = []; 
var arrayListUSerTyping = []; 

io.on("connection" ,function (socket) {
    console.log("co ng truy cap: " + socket.id);
    console.log('arrayUser : ' + arrayUser);

    socket.on('client-send-Username',(user)=>{
        if(arrayUser.indexOf(user) >= 0){
            // gửi thông báo đến người đăng ký thất bại
            socket.emit('server-send-dki-thatbai',{'status': 1, 'messge': 'Username đã được sử dụng'});
        }else{
            // gửi đăng ký thành công
            arrayUser.push(user);
            socket.userName = user;
            // thông báo cho người đăng ký thành công
            socket.emit('server-send-dki-thanhcong', {'status': 1, 'user': user });
            io.sockets.emit('server-send-danhsach-Users', {'status': 1, 'listUser':arrayUser});
        }
    });

    socket.on('client-send-messge', (msg)=>{
        console.log(msg);
        socket.emit('server-send-messge-to-me', {'status': 1, 'message':msg , 'user': socket.userName});
        socket.broadcast.emit('server-send-messge-broadcast', {'status': 1, 'message':msg, 'user': socket.userName});
    });

    socket.on('logout', ()=>{
        arrayUser.splice(
            arrayUser.indexOf(socket.userName),1
        );
        socket.broadcast.emit('server-send-danhsach-Users', {'status': 1, 'listUser':arrayUser});
    });

    socket.on('typing', function () {
        arrayListUSerTyping.push(socket.userName); 
        socket.broadcast.emit('server-send-typing', {'listUserTyping':arrayListUSerTyping});
    })
    socket.on('typing-close', function () {
        console.log(arrayListUSerTyping);
        arrayListUSerTyping.splice(
            arrayListUSerTyping.indexOf(socket.userName),1 
        );
        console.log(arrayListUSerTyping);
        socket.broadcast.emit('server-send-typing', {'listUserTyping':arrayListUSerTyping});
    })

    socket.on("disconnect",function () {
        arrayUser.splice(
            arrayUser.indexOf(socket.userName),1
        );
        socket.broadcast.emit('server-send-danhsach-Users', {'status': 1, 'listUser':arrayUser});
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