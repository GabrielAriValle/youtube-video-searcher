const axios = require('axios');
const stopWords = require('../utils/stopWords');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

const countWords = (texts) => {
  const wordCounts = {};

  texts.forEach((text) => {
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/);

    words.forEach((word) => {
      if (word && !stopWords.includes(word) && !/^\d+$/.test(word)) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });
  });

  return Object.entries(wordCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5)
    .map(([word]) => word);
};

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

    const items = response.data.items;

    const videos = items.map((item) => ({
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.default.url,
      videoId: item.id.videoId,
    }));

    const allTexts = items.flatMap((item) => [item.snippet.title, item.snippet.description]);
    const mostUsedWords = countWords(allTexts);

    return { videos, mostUsedWords };
  } catch (error) {
    console.error('Error fetching videos:', error.message);
    throw new Error('Failed to fetch videos');
  }
};

module.exports = { fetchVideos };
