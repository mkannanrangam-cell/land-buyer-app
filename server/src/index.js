// ...existing code...
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const buyerRoutes = require('./routes/buyers');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// mount routes (ensure these files exist)
app.use('/api/auth', authRoutes);
app.use('/api/buyers', buyerRoutes);

app.get('/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT,'0.0.0.0', () => console.log(`Server listening on ${PORT}`));
// ...existing code...
