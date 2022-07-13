var express = require('express');
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views","./views");

var server = require("http").Server(app);
const io  = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let users = [];
const addUser = (username, socketId) => {
    users.push({username, socketId})
}
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}
const getUser = (username) => {
    return users.find(user => user.username === username)
}
const getUserBySocketId= (socketId) => {
    return users.find(user => user.socketId === socketId)
}

io.on("connection" ,function (socket) {
    console.log("TRUY CAP: " + socket.id);

    socket.on("connected", username => {
        console.log(username);
        addUser(username, socket.id);
        console.log(users);
    })

    // Send & get message
    socket.on("client-send-noti", ({username, msg}) => {
        // console.log(username,msg);
        const user = getUser(username);
        if(user){
            io.to(user.socketId).emit("serve-send-noti", {username, msg})
        }else{
            console.log('Khong co user');
        }
    })

    socket.on("disconnect",function () {
        var user = getUserBySocketId(socket.id);
        removeUser(socket.id);
        if(user){
            console.log("NGAT KET NOI "+ user.username);
        }
    });
})
app.io = io;
app.get("/", function (req, res) {
    res.render("trangchu");    
});
app.get("/send-noti", function (req, res) {
    // console.log(username,msg);
    const user = getUser( req.query.username);
    console.log(user);
    res.send('hello');

    req.app.io.to(user.socketId).emit('hello-all', 'hello mn');  
});

server.listen(3000);