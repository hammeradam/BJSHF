const renderMW = require('../middleware/generic/render');
const getUserByIdMW = require('../middleware/user/getUserById');
const authMW = require('../middleware/generic/auth');
const getOwnProfileMW = require('../middleware/user/getOwnProfile');
const getPlaylistListMW = require('../middleware/playlist/getPlaylistList');

const userModel = require('../models/user');
const songModel = require('../models/song');
const playlistModel = require('../models/playlist');

module.exports = app => {
  let objectRepository = {
    userModel: userModel,
    songModel: songModel,
    playlistModel: playlistModel
  };

  app.use(
    '/profile/:userid',
    authMW(objectRepository),
    getUserByIdMW(objectRepository),
    getPlaylistListMW(objectRepository),
    renderMW(objectRepository, 'profile')
  );

  app.use(
    '/profile',
    authMW(objectRepository),
    getOwnProfileMW(objectRepository),
    getPlaylistListMW(objectRepository),
    renderMW(objectRepository, 'profile')
  );
};
