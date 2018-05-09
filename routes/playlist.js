const renderMW = require('../middleware/generic/render');
const getPlaylistMW = require('../middleware/playlist/getPlaylist');
const authMW = require('../middleware/generic/auth');
const updatePlaylistMW = require('../middleware/playlist/updatePlaylist');
const addSongMW = require('../middleware/song/addSong');
const getSongListMW = require('../middleware/song/getSongList');
const deletePlaylistMW = require('../middleware/playlist/deletePlaylist');
const deleteSongMW = require('../middleware/song/deleteSong');

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
   * Add playlist
   */
  app.post(
    '/playlist/add',
    authMW(objectRepository),
    updatePlaylistMW(objectRepository),
    (req, res, next) => {
      return res.redirect('/profile');
    }
  );

  /**
   * Add song to playlist
   */
  app.post(
    '/playlist/:playlistid/addsong',
    authMW(objectRepository),
    getPlaylistMW(objectRepository),
    addSongMW(objectRepository),
    (req, res, next) => {
      return res.redirect('/playlist/' + req.params.playlistid);
    }
  );

  /**
   * Delete playlist
   */
  app.use(
    '/playlist/:playlistid/delete',
    authMW(objectRepository),
    getPlaylistMW(objectRepository),
    deletePlaylistMW(objectRepository),
    function(req, res, next) {
      return res.redirect('/profile');
    }
  );

  /**
   * Load playlist
   */
  app.use(
    '/playlist/:playlistid',
    authMW(objectRepository),
    getPlaylistMW(objectRepository),
    getSongListMW(objectRepository),
    renderMW(objectRepository, 'playlist')
  );

  /**
   * Delete song
   */
  app.use(
    '/song/:songid/delete',
    authMW(objectRepository),
    deleteSongMW(objectRepository),
    function(req, res, next) {
      return res.redirect('/profile');
    }
  );
};
