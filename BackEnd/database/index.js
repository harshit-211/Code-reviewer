const mongoose = require("mongoose");

const userSchemas = new mongoose.Schema({
    username : String,
    password : String
});

const conversationSchemas = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    code : {
        type : String,
        required : true
    },
    aiResponse : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

const User = mongoose.model("User", userSchemas);
const Conversation = mongoose.model("Conversation", conversationSchemas);

module.exports = {
    User,
    Conversation
};