const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db.js');
const episodemodel = require('./Models/episodeinfo.js');
const getCommentModel = require('./Models/commentinfo.js');
const CastMember = require('./Models/castsinfo.js');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to the database
connectDB();

// Get all episodes
app.get('/episodes', async (req, res) => {
    try {
        const episodes = await episodemodel.find({}, 'episodeNumber title subject'); 
        res.json(episodes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get a specific episode by episodeNumber
app.get('/episodes/:episodeNumber', async (req, res) => {
    try {
        const { episodeNumber } = req.params;
        const episode = await episodemodel.findOne({ episodeNumber });
        if (!episode) {
            return res.status(404).json({ message: 'Episode not found' });
        }
        res.json(episode);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get comments for a specific episode
app.get('/comments/:episodeNumber', async (req, res) => {
    try {
        const { episodeNumber } = req.params;
        const CommentModel = getCommentModel(episodeNumber); // Get model for the specific episode
        const comments = await CommentModel.find();
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching comments' });
    }
});

// Post a comment for a specific episode
app.post('/comments/:episodeNumber', async (req, res) => {
    try {
        const { episodeNumber } = req.params;
        const CommentModel = getCommentModel(episodeNumber); // Get model for the specific episode
        const { username, comment } = req.body;
        const newComment = new CommentModel({ username, comment });
        await newComment.save();
        res.json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving comment' });
    }
});

// Get all cast members
app.get('/casts', async (req, res) => {
    try {
        const casts = await CastMember.find(); // Fetch all cast members
        res.json(casts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Start server
app.listen(3000, () => {
    console.log('App is running on port 3000');
});
