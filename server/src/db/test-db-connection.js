const pool = require('./connection');

(async () => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    console.log('DB connected:', rows);
    process.exit(0);
  } catch (err) {
    console.error('DB connection failed:', err);
    process.exit(1);
  }
})();