const renderMW = require('../middleware/generic/render');
const getPlaylistMW = require('../middleware/playlist/getPlaylist');
const getUserById = require('../middleware/user/getUserById');

const userModel = require('../models/user');
const songModel = require('../models/song');
const playlistModel = require('../models/playlist');

module.exports = function(app) {
  var objectRepository = {
    userModel: userModel,
    songModel: songModel,
    playlistModel: playlistModel
  };

  app.use(
    '/playlists/:playlistid',
    getPlaylistMW(objectRepository),
    renderMW(objectRepository, 'playlist')
  );
};
