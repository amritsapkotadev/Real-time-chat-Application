const asyncHandler = require('express-async-handler');
const chat = require('../models/chatModel');
const User = require('../models/userModel');
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

module.exports={accesschat, fetchChats};