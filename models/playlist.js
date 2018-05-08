const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Playlist = db.model('Playlist', {
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  tags: [String],
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = Playlist;
