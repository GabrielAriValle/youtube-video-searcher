const axios = require('axios');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

const fetchVideos = async (query) => {
  const response = await axios.get(YOUTUBE_API_URL, {
    params: {
      part: 'snippet',        
      q: query,
      type: 'video',
      maxResults: 200,
      key: YOUTUBE_API_KEY,
    },
  });
  return response.data.items;
};

module.exports = { fetchVideos };
