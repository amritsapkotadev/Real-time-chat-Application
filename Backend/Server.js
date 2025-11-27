const express = require('express');
const { chats } = require('./data');

 const app = express();
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT =  5000;
app.get("/api/chat", (req, res) => {
    res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
    //console.log(req.params.id);
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});