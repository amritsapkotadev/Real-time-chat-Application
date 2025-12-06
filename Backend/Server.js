const express = require('express');
require('dotenv').config();
const { chats } = require('./data');
const connectdb = require('./config/db');
const colors = require('colors');
const userRoutes = require('./Routes/UserRoutes');
const cors = require("cors");
const chatRoutes = require('./Routes/ChatRoutes');
const messageRoutes = require('./Routes/MessageRoute');
const path = require('path');

const app = express();  

app.use(cors());       
app.use(express.json());

connectdb();

// API routes
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

// Deployment configuration
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/frontend/build")));

    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running..');
    });
}

const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.yellow.bold);
});

// Socket.io setup
const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.NODE_ENV === "production" ? true : "http://localhost:3000",
        credentials: true,
    },
    transports: ['websocket', 'polling'],
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io".cyan.bold);

socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log("User connected:".green, userData._id);
    socket.emit("connected");
});

socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room:".yellow, room);
});


socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if (!chat.users) {
        return console.log("chat.users not defined");
    }

    console.log("Broadcasting message to chat:".magenta, chat._id);
    
    chat.users.forEach((user) => {
        if (user._id == newMessageReceived.sender._id) return;

        console.log("Sending to user:".blue, user._id);
        socket.in(user._id).emit("message received", newMessageReceived);
    });
});

socket.on("typing", (room) => {
    socket.in(room).emit("typing");
});

socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
});

    // Optional: detect disconnect
    socket.on("disconnect", () => {
        console.log("Socket disconnected");
    });
});
