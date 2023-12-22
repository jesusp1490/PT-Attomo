const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/auth');
const { getByEmail, registerUser, loginUser, getUserProfile, allUsers, updateUser } = require('../controllers/userControllers');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:userId', updateUser);
router.get('/', allUsers);
router.get('/:email', getByEmail)
router.get('/profile', authenticate, getUserProfile);

module.exports = router;
