const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Must match the secret used to sign tokens in authController.login
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

const authMiddleware = async (req, res, next) => {
    try {
        const token = (req.header('Authorization') || '').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Please authenticate.' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ error: 'Please authenticate.' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate.' });
    }
};

module.exports = authMiddleware;