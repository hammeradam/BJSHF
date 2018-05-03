const requireOption = require("../common").requireOption;

module.exports = objectrepository => {
  let playlistModel = requireOption(objectrepository, "playlistModel");
  let songModel = requireOption(objectrepository, "songModel");

  function saveCallback(res, next, song) {
    song.save(function(err, result) {
      if (err) {
        return next(err);
      }
      return res.redirect("/playlist/" + res.tpl.playlist._id);
    });
  }

  return (req, res, next) => {
    if (
      typeof req.body.title === "undefined" ||
      typeof req.body.artist === "undefined" ||
      typeof req.body.youtube === "undefined" ||
      typeof req.body.spotify === "undefined"
    ) {
      return next();
    }

    let song = undefined;
    if (typeof res.tpl.playlist == "undefined") {
      return next();
    }

    if (typeof res.tpl.comment !== "undefined") {
      song = res.tpl.song;

      return saveCallback(res, next, song);
    } else {
      song = new songModel();
      song.title = req.body.title;
      song.artist = req.body.artist;
      song.youtube = req.body.youtube;
      song.spotify = req.body.spotify;
      song._playlist = res.tpl.playlist;

      return saveCallback(res, next, song);
    }
  };
};
