const express = require('express');
const router = express.Router();
const { fetchVideos } = require('../services/youtube');

router.get('/', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const videos = await fetchVideos(query); 
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error.message);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

module.exports = router;
