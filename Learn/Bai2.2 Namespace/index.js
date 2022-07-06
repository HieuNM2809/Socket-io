var express = require('express');
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views","./views");

var server = require("http").Server(app);
const io  = require('socket.io')(server, {
    // cors: {
    //     credentials: true,
    //     origin: "*",
    //     methods: ["GET", "POST"]
    // },
    // allowRequest: (req, callback) => {
    //     var date1 = new Date();
    //     var month = date1.getSeconds();
    //     console.log(month);
    //     callback(null, true);
    // }
});
const nsp1 = io.of("/my-namespace");
nsp1.on("connection", socket => {
    console.log(socket.id);
    nsp1.emit("hi", "everyone!"); 
    setInterval(() => {
        nsp1.emit("hi", "everyone!"); 
    }, 1000);
    socket.on("disconnect",function () {
        console.log(socket.id + " ngat ket noiiiii");
    });
});



// // namespace 1
// const nsp1 = io.of("/my-namespace1");

// nsp1.on("connection", socket => {
//     console.log("my-namespace1");
//     nsp1.emit("hi", "everyone!");
// });


// // namespace 2
// const nsp2 = io.of("/my-namespace2");

// nsp2.on("connection", socket => {
//     console.log("my-namespace2");
//     nsp2.emit("hi", "everyone!");
// });



app.get("/", function (req, res) {
    res.render("trangchu");    
});

server.listen(3000);



//https://socket.io/docs/v4/server-application-structure/
