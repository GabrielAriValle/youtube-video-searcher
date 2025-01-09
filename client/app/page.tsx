"use client";

import { useState } from 'react';

interface Video {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
}

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [mostUsedWords, setMostUsedWords] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/videos?query=${query}`);
      const data = await response.json();
      setVideos(data.videos);
      setMostUsedWords(data.mostUsedWords);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>YouTube Video Searcher</h1>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for videos..."
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <button onClick={handleSearch} style={{ padding: '10px 20px' }}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <div style={{ marginTop: '20px' }}>
        {mostUsedWords.length > 0 && (
          <div>
            <h3>Top 5 Words:</h3>
            <ul>
              {mostUsedWords.map((word, index) => (
                <li key={index}>{word}</li>
              ))}
            </ul>
          </div>
        )}

        {videos.map((video) => (
          <div key={video.videoId} style={{ marginBottom: '20px' }}>
            <img src={video.thumbnail} alt={video.title} style={{ width: '150px', height: 'auto' }} />
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <a href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer">
              Watch Video
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
