const requireOption = require('../common').requireOption;
/**
 * Delete the song object
 */
module.exports = function(objectrepository) {
  let songModel = requireOption(objectrepository, 'songModel');

  return function(req, res, next) {
    console.log('deleteSongMW');
    if (
      typeof req.params.songid === 'undefined' ||
      req.params.songid === 'null'
    ) {
      return next();
    }

    songModel.findOne({ _id: req.params.songid }, (err, result) => {
      if (err) {
        return next(err);
      }
      const playlistId = result._playlist.toString();

      result.remove(function(err) {
        if (err) {
          return next(err);
        }

        res.redirect('/playlist/' + result._playlist.toString());
      });
    });
  };
};
