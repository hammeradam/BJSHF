const renderMW = require('../middleware/render');

// mock data
const data = require('../mockData/data');

module.exports = function(app) {
  app.use(
    "/index",
    (req, res, next) => {
      res.tpl.playlists = data.playListcards;
      next();
    },
    renderMW("index")
  );

  app.use("/login", (req, res, next) => next(), renderMW("login"));
  
  app.use("/register", (req, res, next) => next(), renderMW("register"));

  app.use(
    "/playlist",
    (req, res, next) => {
      res.tpl.songs = data.songs;
      next();
    },
    renderMW("playlist")
  );

  app.use(
    "/profile",
    (req, res, next) => {
      res.tpl.playlists = data.playListcards;
      res.tpl.profile = data.profile;
      res.tpl.profiles = data.profiles;
      next();
    },
    renderMW("profile")
  );
};
