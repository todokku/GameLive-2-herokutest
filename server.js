const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./models');
const socket = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 8080;

// Updating mongoose's promise version
mongoose.Promise = global.Promise;

// Connecting to MongoDB through Mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/TestRealTime").then(() => {
    console.log('connected to the db');
}).catch((err) => {
    console.log(err);
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    next();
});

// Middleware to parse the request body as json
app.use(bodyParser.json());

// GET all the previous messages
app.get('/api/room', (req, res) => {
    db.Room.find({}).exec((err, rooms) => {
        if(err) {
            res.send(err).status(500);
        } else {
            res.send(rooms).status(200);
        }
    });
});

// POST a new message
app.post('/api/room', (req, res) => {
    db.Room.findOne({
        host: req.body.player
    }).then(function(dbRoom){
        if(!dbRoom){
            createRoom(req, res)
        } else {
            console.log("already room")
        }
    })
});

function createRoom(req, res){
    var roomCode = '';
    var characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 10; i++ ) {
        roomCode += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    db.Room.create({
        code: roomCode,
        players: [req.body.player],
        host: req.body.player
    }).then((room) => {
        res.send(room).status(200);
    }).catch((err) => {
        console.log(err);
        res.send(err).status(500);
    });
}

if(process.env.NODE_ENV === "production") {
    app.use(express.static("./client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
    });
}

// Start the server at the specified PORT
let server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// Starting a socket on the specified server
let io = socket(server);

io.on("connection", (socket) => {

    socket.on("new-room", (data) => {
        io.sockets.emit("new-room", data);
    });

});
