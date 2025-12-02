const asyncHandler = require('express-async-handler');
const chat = require('../models/chatModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const accesschat=asyncHandler(async(req,res)=>{
    const {userId}=req.body;   
    
    if(!userId){ //yo id baata chat chaina
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }
    var isChat=await chat.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}},
        ],
    }).populate("users","-password")
    .populate("latestMessage");

    isChat=await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name pic email",
    }); 
    if(isChat.length>0){
        res.send(isChat[0]);
    }else{
        var chatData={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId],
        };
        try {
            const createdChat=await chat.create(chatData);
            const FullChat=await chat.findOne({_id:createdChat._id}).populate("users","-password");
            res.status(200).send(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});

const fetchChats=asyncHandler(async(req,res)=>{
    try {
        let results = await chat.find({users:{$elemMatch:{$eq:req.user._id}}})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({updatedAt:-1});
        results = await User.populate(results,{
            path:"latestMessage.sender",
            select:"name pic email",
        });
        res.status(200).send(results);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }   
             
});

const createGroupChat = asyncHandler(async (req, res) => {
    const { users, name } = req.body;

    if (!users || !name) {
        return res.status(400).send({ message: "Please fill all the fields" });
    }

    let parsedUsers;

    // Handle both array and JSON string
    if (Array.isArray(users)) {
        parsedUsers = users;
    } else if (typeof users === 'string') {
        try {
            parsedUsers = JSON.parse(users);
        } catch (err) {
            return res.status(400).send({ message: "Invalid users format" });
        }
    } else {
        return res.status(400).send({ message: "Invalid users format" });
    }

    if (parsedUsers.length < 2) {
        return res.status(400).send({ message: "More than 2 users are required to form a group chat" });
    }

    // Add logged-in user to group
    parsedUsers.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: name,
            users: parsedUsers,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        return res.status(200).json(fullGroupChat);

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { chatName: chatName },
        { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(updatedChat);
    }
});


const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    
    const chatGroup = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },
        },
        { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
        
    if (!chatGroup) {   
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(chatGroup);
    }
});


const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId },
        },
        { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!removed) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(removed);
    }
});

const deleteChat = asyncHandler(async (req, res) => {
    const { chatId } = req.params;

    try {
        const chat = await Chat.findById(chatId);

        if (!chat) {
            res.status(404);
            throw new Error("Chat Not Found");
        }

        // Check if user is part of the chat
        const isUserInChat = chat.users.some(user => user.toString() === req.user._id.toString());
        
        if (!isUserInChat) {
            res.status(403);
            throw new Error("User not authorized to delete this chat");
        }

        // For group chats, only admin can delete
        if (chat.isGroupChat && chat.groupAdmin.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error("Only group admin can delete the group");
        }

        await Chat.findByIdAndDelete(chatId);
        res.status(200).json({ message: "Chat deleted successfully" });
        
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports={accesschat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup, deleteChat};