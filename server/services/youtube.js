const axios = require('axios');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

const fetchVideos = async (query) => {
  try {
    const response = await axios.get(YOUTUBE_API_URL, {
      params: {
        part: 'snippet',        
        q: query,
        type: 'video',
        maxResults: 20,
        key: YOUTUBE_API_KEY,
      },
    });
  
    return response.data.items.map((item) => ({
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.default.url,
      videoId: item.id.videoId,
    }));
  } catch (error) {
    console.error('Error fetching videos:', error.message);
    throw new Error('Failed to fetch videos');
  }
};

module.exports = { fetchVideos };
