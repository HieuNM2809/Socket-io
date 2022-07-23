require("dotenv").config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
var jwt = require('jsonwebtoken');

app.use(express.json());


// server listening 
server.listen(3000, () => {
  console.log(`Server running on port ${3000}`);
});

app.get('/get-token',(req ,res ) => {
    
    var data = jwt.sign({
       username :req.body.username
    }, 'secret', { expiresIn: 60});
    return res.json(data);
});
app.post('/check-token',(req,res ) => {
    const token = req.body.token || req.query.token || req.headers["token"] ||req.headers.authorization.token;
    try {
        const decoded = jwt.verify(token, 'secret');
        return res.json(decoded);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
});