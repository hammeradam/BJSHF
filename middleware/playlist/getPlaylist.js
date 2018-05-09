const requireOption = require('../common').requireOption;

/**
 * Get the playlist for the playlistid param
 *  - if there is no such playlist, redirect to /profile
 *  - if there is one, put it on res.tpl.playlist
 */
module.exports = objectrepository => {
  let playlistModel = requireOption(objectrepository, 'playlistModel');

  return (req, res, next) => {
    console.log('getPlaylistMW');
    playlistModel
      .findOne({
        _id: req.params.playlistid
      })
      .exec((err, result) => {
        if (err || !result) {
          return res.redirect('/profile');
        }
        res.tpl.playlist = result;
        return next();
      });
  };
};
