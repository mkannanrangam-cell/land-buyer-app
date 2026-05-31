const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

// ensure we load the .env from the app root (land-buyer-app/.env)
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const host = process.env.DB_HOST || 'localhost';
const user = (process.env.DB_USER || 'root').replace(/@.*$/, ''); // strip accidental "@host"
const password = process.env.DB_PASS || process.env.DB_PASSWORD || '';
const database = process.env.DB_NAME || 'land_buyer_db';

console.log('DB config ->', { host, user, database, password: password ? '***' : '(empty)' });

const pool = mysql.createPool({
  host,
  user,
  password,
  database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;