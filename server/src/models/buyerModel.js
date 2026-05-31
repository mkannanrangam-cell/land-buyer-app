const db = require('../db/connection');

module.exports = {
    async getAll() {
        const [rows] = await db.execute('SELECT * FROM buyers ORDER BY created_at DESC');
        return rows;
    },

    async getById(id) {
        const [rows] = await db.execute('SELECT * FROM buyers WHERE id = ?', [id]);
        return rows[0];
    },

    async create(data) {
        const { name, phone, sqft, city, area, pincode, cost, created_by } = data;
        const [result] = await db.execute(
            'INSERT INTO buyers (name, phone, sqft, city, area, pincode, cost, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, phone, sqft, city, area, pincode, cost, created_by || null]
        );
        return result.insertId;
    },

    async update(id, data) {
        const { name, phone, sqft, city, area, pincode, cost } = data;
        await db.execute(
            'UPDATE buyers SET name=?, phone=?, sqft=?, city=?, area=?, pincode=?, cost=? WHERE id=?',
            [name, phone, sqft, city, area, pincode, cost, id]
        );
    },

    async remove(id) {
        await db.execute('DELETE FROM buyers WHERE id = ?', [id]);
    }
};