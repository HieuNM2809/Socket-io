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

io.on("connection" ,function (socket) {
    console.log("TRUY CAP: " + socket.id);

    socket.on("connected", username => {
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
        removeUser(socket.id);
        // console.log("NGAT KET NOI "+socket.id);
    });
})

app.get("/", function (req, res) {
    res.render("trangchu");    
});

server.listen(3000);