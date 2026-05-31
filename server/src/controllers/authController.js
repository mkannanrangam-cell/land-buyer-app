const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/connection');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const RESET_TOKEN_TTL_MINUTES = 15;

class AuthController {
    async register(req, res) {
        const { username, password, phone } = req.body;
        if (!username || !password || !phone) {
            return res.status(400).json({ message: 'username, password and phone are required' });
        }

        try {
            const [existing] = await db.execute(
                'SELECT id FROM users WHERE username = ? OR phone = ?',
                [username, phone]
            );
            if (existing.length) return res.status(409).json({ message: 'Username or phone already exists' });

            const hashed = await bcrypt.hash(password, 10);
            const id = await userModel.create({ username, password_hash: hashed, phone });
            return res.status(201).json({ id, message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error registering user' });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ message: 'username and password required' });

        try {
            const [rows] = await db.execute('SELECT id, password_hash FROM users WHERE username = ?', [username]);
            if (!rows.length) return res.status(401).json({ message: 'Invalid credentials' });

            const user = rows[0];
            const match = await bcrypt.compare(password, user.password_hash);
            if (!match) return res.status(401).json({ message: 'Invalid credentials' });

            const token = jwt.sign({ id: user.id, username }, JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error logging in' });
        }
    }

    // Step 1: verify the username + registered phone pair, return a short-lived reset token
    async verifyIdentity(req, res) {
        const { username, phone } = req.body;
        if (!username || !phone) {
            return res.status(400).json({ message: 'username and phone are required' });
        }

        try {
            const user = await userModel.findByUsernameAndPhone(username, phone);
            if (!user) {
                return res.status(400).json({ message: 'No account matches that username and phone number.' });
            }

            const resetToken = jwt.sign(
                { id: user.id, purpose: 'password_reset' },
                JWT_SECRET,
                { expiresIn: `${RESET_TOKEN_TTL_MINUTES}m` }
            );
            return res.status(200).json({ resetToken });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error verifying identity' });
        }
    }

    // Step 2: set the new password using the reset token from step 1
    async resetPassword(req, res) {
        const { resetToken, newPassword } = req.body;
        if (!resetToken || !newPassword) {
            return res.status(400).json({ message: 'resetToken and newPassword are required' });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        try {
            let decoded;
            try {
                decoded = jwt.verify(resetToken, JWT_SECRET);
            } catch {
                return res.status(401).json({ message: 'Reset session expired. Please start again.' });
            }
            if (decoded.purpose !== 'password_reset') {
                return res.status(401).json({ message: 'Invalid reset token' });
            }

            const hashed = await bcrypt.hash(newPassword, 10);
            await userModel.updatePassword(decoded.id, hashed);
            return res.status(200).json({ message: 'Password updated successfully. You can now log in.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error resetting password' });
        }
    }
}

module.exports = new AuthController();
