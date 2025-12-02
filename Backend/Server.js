const express = require('express');
require('dotenv').config();
const { chats } = require('./data');
const connectdb = require('./config/db');
const colors = require('colors');
const userRoutes = require('./Routes/UserRoutes');
const cors = require("cors");
const chatRoutes = require('./Routes/ChatRoutes');
const messageRoutes = require('./Routes/MessageRoute');

const app = express();  

app.use(cors());       
app.use(express.json());

connectdb();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

const PORT = 5001;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.yellow.bold);
});

// Socket.io setup
const io = require("socket.io")(server, {
    pingTimeout: 60000, // Client bata pong na aayo bhaye connection kati time samma rakheko ho (60 seconds)
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");

socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log("User connected: " + userData._id);
    socket.emit("connected");
});

socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room: " + room);
});


socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if (!chat.users) {
        return console.log("chat.users not defined");
    }

    chat.users.forEach((user) => {
        if (user._id == newMessageReceived.sender._id) return;

        socket.in(user._id).emit("message received", newMessageReceived);
    });
});

    // Optional: detect disconnect
    socket.on("disconnect", () => {
        console.log("Socket disconnected");
    });
});
