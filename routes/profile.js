const renderMW = require('../middleware/generic/render');
const getUserByIdMW = require('../middleware/user/getUserById');
const authMW = require('../middleware/generic/auth');
const getOwnProfileMW = require('../middleware/user/getOwnProfile');
const getPlaylistListMW = require('../middleware/playlist/getPlaylistList');
const getUserListMW = require('../middleware/user/getUserList');
const saveUserIdtoTplMW = require('../middleware/user/saveUserIdToTpl');

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
    '/profile/:userid',
    authMW(objectRepository),
    getUserByIdMW(objectRepository),
    getPlaylistListMW(objectRepository),
    getUserListMW(objectRepository),
    saveUserIdtoTplMW(objectRepository),
    renderMW(objectRepository, 'profile')
  );

  /**
   * Load own profile
   */
  app.use(
    '/profile',
    authMW(objectRepository),
    getOwnProfileMW(objectRepository),
    getPlaylistListMW(objectRepository),
    getUserListMW(objectRepository),
    saveUserIdtoTplMW(objectRepository),
    renderMW(objectRepository, 'profile')
  );
};
