import React, { useState, useEffect } from "react";
import ic814 from './images/ic814 copy.webp';
import backgroundImage from './images/pilot1copy.jpeg';
import './home.css';
import { useNavigate } from "react-router-dom";

// Define the Episode interface to match the database structure
interface Episode {
  episodeNumber: number;
  title: string;
  subject: string;
}

function Homepage() {
  const navigate = useNavigate(); 

  // State to store fetched episodes from the database
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch episodes from the backend
  useEffect(() => {
    fetch('http://localhost:3000/episodes') 
      .then((response) => response.json())
      .then((data) => setEpisodes(data))
      .catch((error) => console.error('Error fetching episodes:', error));
  }, []);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

// Filter episodes based on search query
const filteredEpisodes = episodes.filter((episode) => {
    const search = searchQuery.toLowerCase();
  
    // Search by title or subject (case-insensitive)
    const matchesTitleOrSubject = episode.title.toLowerCase().includes(search) || 
                                  episode.subject.toLowerCase().includes(search);
  
    // Search by episode number (e.g., "episode 1" or just "1")
    const matchesEpisodeNumber = `episode ${episode.episodeNumber}`.includes(search) || 
                                 episode.episodeNumber.toString().includes(searchQuery);
  
    return matchesTitleOrSubject || matchesEpisodeNumber;
  });
  

  return (
    <div>
      <div className="ic814-image">
        <img
          src={ic814}
          alt="IC 814: The Kandahar Attack"
        />
      </div>
      <div className="description">
        <p>
          <strong>IC 814: The Kandahar Hijack</strong> chronicles the harrowing events of the 1999 Indian Airlines flight hijacking. The five-day ordeal gripped the world as Flight IC 814, en route from Kathmandu to Delhi, was forcibly diverted by terrorists to Kandahar, Afghanistan. This series brings to life the intense negotiations, the bravery of the passengers and crew, and the geopolitical complexities that unfolded as India fought to bring its citizens home.
        </p>
      </div>
      <div className="episode-heading">
        <div className="episode">
          <h1>EPISODES</h1>
        </div>
        <div className="search-episode">
          <input
            type="text"
            placeholder="Search episodes..."
            value={searchQuery}
            onChange={handleSearchChange} 
          />
        </div>
      </div>
      <div className="homepage">
        <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}>
          {filteredEpisodes.map((episode) => (
            <div
              key={episode.episodeNumber}
              className="episode-box"
              onClick={() => navigate(`/episode/${episode.episodeNumber}`)}
            >
              <h3>Episode {episode.episodeNumber}</h3>
              <p className="title">{episode.title}</p>
              <p className="subject">{episode.subject}</p> 
            </div>
          ))}
        </div>
      </div>
      <div className="casts">
        <button className="view-casts-button" onClick={() => navigate('/casts')}>
          View Casts
        </button>
      </div>
    </div>
  );
}

export default Homepage;
