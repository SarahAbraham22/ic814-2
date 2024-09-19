import React, { useState, useEffect } from 'react';
import episodeimage from './images/episodepage.jpeg';
import { useParams, useNavigate } from 'react-router-dom';
import './EpisodeDetail.css';

// Define interfaces for Episode and Comment
interface Episode {
  episodeNumber: number;
  title: string;
  description: string;
  airDate: string;
}

interface Comment {
  username: string;
  comment: string;
}

const EpisodeDetail = () => {
  const { episodeNumber } = useParams<{ episodeNumber: string }>();
  const navigate = useNavigate();
  const episodeNum = episodeNumber ? parseInt(episodeNumber) : null;

  // State for storing episode details and comments
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');

  // Fetch episode details and comments
  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch episode details
    if (episodeNum) {
      fetch(`http://localhost:3000/episodes/${episodeNum}`)
        .then((response) => response.json())
        .then((data) => setEpisode(data))
        .catch((error) => console.error('Error fetching episode:', error));
      
      // Fetch comments for the episode
      fetch(`http://localhost:3000/comments/${episodeNum}`)
        .then((response) => response.json())
        .then((data) => setComments(data))
        .catch((error) => console.error('Error fetching comments:', error));
    }
  }, [episodeNum]);

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (!username || !comment) {
      alert('Please enter both username and comment.');
      return;
    }

    const newComment = {
      username,
      comment,
    };

    // Post the new comment to the backend
    fetch(`http://localhost:3000/comments/${episodeNum}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newComment),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments((prevComments) => [...prevComments, data]);
        setUsername(''); // Clear username input
        setComment('');  // Clear comment input
      })
      .catch((error) => console.error('Error posting comment:', error));
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className='episode-page'>
      <button className='back-button' onClick={handleBackClick}>Back</button>
      {episode ? (
        <div>
          <div className='top-section'>
            <img src={episodeimage} alt="Episode-image"></img>
            <h1>{episode.title}</h1>
          </div>
          <div className='middle-section'>
            <p>{episode.description}</p>
            <p><strong>Air Date:</strong> {new Date(episode.airDate).toLocaleDateString()}</p>
          </div>
          <div className='bottom-section'>
            <h2>Comments</h2>
            <ul>
              {comments.map((c, index) => (
                <li key={index}>{c.username}: {c.comment}</li>
              ))}
            </ul>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your comment"
            />
            <button onClick={handleCommentSubmit}>Submit Comment</button>
          </div>
        </div>
      ) : (
        <p>Episode not found.</p>
      )}
    </div>
  );
};

export default EpisodeDetail;
