const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/Authmiddleware');
const { sendMessage,fetchallmessages } = require('../controllers/messageController');

// logged in le matrai message pathauna ani fetch garna milcha so protect middleware use gareko
router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, fetchallmessages);
module.exports = router; 