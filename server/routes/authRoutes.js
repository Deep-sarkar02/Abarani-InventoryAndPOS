const express = require('express');
const router = express.Router();
const { loginUser, registerUser, getAllUsers, deleteUser } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/login', loginUser);
router.post('/register', protect, admin, registerUser); // Admin only
router.get('/users', protect, admin, getAllUsers); // Admin only - get all users
router.delete('/:id', protect, admin, deleteUser); // Admin only - delete user

module.exports = router;
