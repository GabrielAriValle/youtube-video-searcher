require('dotenv').config({ path: './server/.env' });;
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const videoRoutes = require('./routes/videos');
app.use('/api/videos', videoRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
