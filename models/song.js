const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Song = db.model('Song', {
  _playlist: {
    type: Schema.Types.ObjectId,
    ref: 'Playlist',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  length: {
    type: Number,
    required: true
  }
});

module.exports = Song;
