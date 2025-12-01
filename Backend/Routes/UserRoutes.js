const express = require('express');
const router = express.Router();
const { registerUser,authUser,allUsers } = require('../controllers/usercontroller');
const { protect } = require('../middleware/Authmiddleware');    
router.route('/register').post(registerUser);
router.route('/login').post(authUser);
router.route('/').get(protect, allUsers);

module.exports = router;