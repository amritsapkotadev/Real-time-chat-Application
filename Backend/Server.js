const express = require('express');
require('dotenv').config();      

const { chats } = require('./data');
const connectdb = require('./config/db');
const colors = require('colors');
connectdb();                   

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = 5000;

app.get("/api/chat", (req, res) => {
    res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.yellow.bold);
});
