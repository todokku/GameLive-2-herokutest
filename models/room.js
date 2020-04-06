const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Blueprint of what a message would look like in our DB.
const RoomSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    players: {
        type: Array
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Makes a model of the above schema.
const Room = mongoose.model("Room", RoomSchema);

// Exporting the model so that it can be used in server.js and/or other files.
module.exports = Room;