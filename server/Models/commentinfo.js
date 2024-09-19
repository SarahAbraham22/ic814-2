const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Comment schema
const CommentSchema = new Schema({
  username: { type: String, required: true },
  comment: { type: String, required: true },
});

// Create and export a model based on the collection name
const getCommentModel = (episodeNumber) => mongoose.model(`comment_episode${episodeNumber}`, CommentSchema);

module.exports = getCommentModel;
