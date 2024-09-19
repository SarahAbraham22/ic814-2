const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Episode schema with the additional 'subject' field
const EpisodeSchema = new Schema({
  episodeNumber: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  airDate: { type: Date, required: true },
  subject: { type: String, required: true }, // Added subject field
});

const episodemodel = mongoose.model('episodeinfo', EpisodeSchema);

// Create and export the Episode model
module.exports = episodemodel;
