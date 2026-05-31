const db = require('../db/connection');

// Maps to the `users` table: id, username, password_hash, phone, created_at
module.exports = {
    // Used by authMiddleware after verifying a JWT — never exposes password_hash
    async findById(id) {
        const [rows] = await db.execute(
            'SELECT id, username, phone, created_at FROM users WHERE id = ?',
            [id]
        );
        return rows[0];
    },

    // Used during login — includes password_hash for bcrypt comparison
    async findByUsername(username) {
        const [rows] = await db.execute(
            'SELECT id, username, password_hash, phone, created_at FROM users WHERE username = ?',
            [username]
        );
        return rows[0];
    },

    // Used by the forgot-password flow to verify the username + phone pair
    async findByUsernameAndPhone(username, phone) {
        const [rows] = await db.execute(
            'SELECT id, username, phone, created_at FROM users WHERE username = ? AND phone = ?',
            [username, phone]
        );
        return rows[0];
    },

    async create({ username, password_hash, phone }) {
        const [result] = await db.execute(
            'INSERT INTO users (username, password_hash, phone) VALUES (?, ?, ?)',
            [username, password_hash, phone]
        );
        return result.insertId;
    },

    async updatePassword(id, password_hash) {
        await db.execute('UPDATE users SET password_hash = ? WHERE id = ?', [password_hash, id]);
    }
};
