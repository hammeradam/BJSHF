const renderMW = require('../middleware/generic/render');
const getUserByIdMW = require('../middleware/user/getUserById');
const authMW = require('../middleware/generic/auth');
const getPlaylistListMW = require('../middleware/playlist/getPlaylistList');
const getUserListMW = require('../middleware/user/getUserList');

const userModel = require('../models/user');
const songModel = require('../models/song');
const playlistModel = require('../models/playlist');

module.exports = app => {
  let objectRepository = {
    userModel: userModel,
    songModel: songModel,
    playlistModel: playlistModel
  };

  /**
   * Load profile
   */
  app.use(
    '/profile/:userid?',
    authMW(objectRepository),
    getUserByIdMW(objectRepository),
    getPlaylistListMW(objectRepository),
    getUserListMW(objectRepository),
    renderMW(objectRepository, 'profile')
  );
};
