const renderMW = require("../middleware/generic/render");
const getPlaylistMW = require("../middleware/playlist/getPlaylist");
const authMW = require("../middleware/generic/auth");
const updatePlaylistMW = require("../middleware/playlist/updatePlaylist");
const addSongMW = require("../middleware/playlist/addSong");
const getSongListMW = require("../middleware/playlist/getSongList");
const deletePlaylistMW = require("../middleware/playlist/deletePlaylist");

const userModel = require("../models/user");
const songModel = require("../models/song");
const playlistModel = require("../models/playlist");

module.exports = app => {
  let objectRepository = {
    userModel: userModel,
    songModel: songModel,
    playlistModel: playlistModel
  };

  app.post(
    "/playlist/add",
    authMW(objectRepository),
    updatePlaylistMW(objectRepository),
    (req, res, next) => {
      return res.redirect("/profile");
    }
  );

  app.post(
    "/playlist/:playlistid/addsong",
    authMW(objectRepository),
    getPlaylistMW(objectRepository),
    addSongMW(objectRepository),
    (req, res, next) => {
      return res.redirect("/playlist/" + req.params.playlistid);
    }
  );

  app.use(
    "/playlist/:playlistid/delete",
    authMW(objectRepository),
    getPlaylistMW(objectRepository),
    deletePlaylistMW(objectRepository),
    function(req, res, next) {
      return res.redirect("/profile");
    }
  );

  app.use(
    "/playlist/:playlistid",
    authMW(objectRepository),
    getPlaylistMW(objectRepository),
    getSongListMW(objectRepository),
    renderMW(objectRepository, "playlist")
  );
};
