const express = require('express');
const { fetchVideos } = require('../services/youtube');

const router = express.Router();

router.get('/', async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const { videos, mostUsedWords } = await fetchVideos(query);
    res.json({ videos, mostUsedWords });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
