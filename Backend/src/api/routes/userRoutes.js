const express = require('express');
const router = express.Router();
const { isAuth } = require('../../middleware/auth');
const { getByEmail, registerUser, loginUser, getUserProfile, allUsers, updateUser } = require('../controllers/userControllers');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:userId', isAuth, updateUser);
router.get('/', isAuth, allUsers);
router.get('/:email', isAuth, getByEmail);
router.get('/profile', isAuth, getUserProfile);

module.exports = router;
