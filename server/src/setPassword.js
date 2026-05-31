const path = require('path');
const db = require(path.join(__dirname, 'db', 'connection'));
const bcrypt = require('bcryptjs');

const [, , username, plain] = process.argv;
if (!username || !plain) {
  console.error('Usage: node src/setPassword.js <username> <password>');
  process.exit(1);
}

(async () => {
  try {
    const hash = await bcrypt.hash(plain, 10);
    const [result] = await db.execute('UPDATE users SET password_hash = ? WHERE username = ?', [hash, username]);
    if (result.affectedRows === 0) {
      const [ins] = await db.execute('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, hash]);
      console.log('Inserted user id', ins.insertId);
    } else {
      console.log('Updated password for', username);
    }
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();