const requireOption = require('../common').requireOption;

/**
 * Get the users playlists
 */
module.exports = function(objectrepository) {
  var playlistModel = requireOption(objectrepository, 'playlistModel');

  return function(req, res, next) {
    console.log('getPlaylistListMW');
    if (req.params.userid) {
      playlistModel.find(
        {
          _owner: req.params.userid
        },
        (err, playlists) => {
          res.tpl.playlists = playlists;
          return next();
        }
      );
    } else {
      playlistModel.find(
        {
          _owner: req.session.userid
        },
        (err, playlists) => {
          res.tpl.playlists = playlists;
          return next();
        }
      );
    }
  };
};
