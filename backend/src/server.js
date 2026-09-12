const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/transaction', require('./routes/transaction'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Guardian API' });
});

app.listen(PORT, () => {
  console.log(`Guardian backend running on port ${PORT}`);
});
