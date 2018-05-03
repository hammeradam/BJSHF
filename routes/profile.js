const renderMW = require("../middleware/generic/render");
const getPlaylistMW = require("../middleware/playlist/getPlaylist");
const getUserById = require("../middleware/user/getUserById");
const checkUserLogin = require("../middleware/user/checkUserLogin");
const authMW = require("../middleware/generic/auth");
const getOwnProfileMW = require("../middleware/user/getOwnProfile");
const getPlaylistListMW = require("../middleware/playlist/getPlaylistList");

const userModel = require("../models/user");
const songModel = require("../models/song");
const playlistModel = require("../models/playlist");

module.exports = app => {
  let objectRepository = {
    userModel: userModel,
    songModel: songModel,
    playlistModel: playlistModel
  };

  app.use(
    "/profile/:userid",
    authMW(objectRepository),
    getUserById(objectRepository),
    getPlaylistListMW(objectRepository),
    renderMW(objectRepository, "profile")
  );

  // app.use(
  //   '/profile',
  //   authMW(objectRepository),
  //   getOwnProfileMW(objectRepository),
  //   renderMW(objectRepository, 'profile')
  // );
};
