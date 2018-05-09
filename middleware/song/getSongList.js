const requireOption = require('../common').requireOption;

/**
 * Get the songs for the :playlistid playlist
 *  - if there is one, put it on res.tpl.songs
 */
module.exports = function(objectrepository) {
  var songModel = requireOption(objectrepository, 'songModel');

  return function(req, res, next) {
    console.log('getSongListMW');
    songModel.find(
      {
        _playlist: req.params.playlistid
      },
      (err, songs) => {
        res.tpl.songs = songs;
        return next();
      }
    );
  };
};
