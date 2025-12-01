const express = require('express');
require('dotenv').config();
const { chats } = require('./data');
const connectdb = require('./config/db');
const colors = require('colors');
const userRoutes = require('./Routes/UserRoutes');
const cors = require("cors");
const chatRoutes = require('./Routes/ChatRoutes');
const app = express();  

app.use(cors());       
app.use(express.json());

connectdb();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api/user', userRoutes);
app.use('/api/chat',chatRoutes);

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.yellow.bold);
});
