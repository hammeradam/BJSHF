const requireOption = require('../common').requireOption;

/**
 * Create (or update) task if we have the data for it
 * update if we have a res.tpl.task, create if we don't have
 *  - if there is no title, set tpl.error
 *  - if everything is ok redirect to /task/:id
 */
module.exports = objectrepository => {
  let playlistModel = requireOption(objectrepository, 'playlistModel');

  return (req, res, next) => {
    if (
      typeof req.body.title === 'undefined' ||
      typeof req.body.artist === 'undefined' ||
      typeof req.body.youtube === 'undefined' ||
      typeof req.body.spotify === 'undefined'
    ) {
      return next();
    }

    let song = undefined;
    if (typeof res.tpl.playlist == 'undefined') {
      return next();
    }
    song = {
      title: req.body.title,
      artist: req.body.artist,
      youtube: req.body.youtube,
      spotify: req.body.spotify
    };

    let playlist = res.tpl.playlist;
    playlist.songs.push(song);

    playlist.save((err, result) => {
      if (err) {
        return next(err);
      }
      return next();
    });
  };
};
