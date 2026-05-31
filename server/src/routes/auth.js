const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for user login
router.post('/login', authController.login);

// Route for user registration
router.post('/register', authController.register);

// Password reset via username + registered phone number (no SMS/OTP)
router.post('/verify-identity', authController.verifyIdentity); // step 1: verify username + phone -> reset token
router.post('/reset-password', authController.resetPassword);   // step 2: set new password

module.exports = router;