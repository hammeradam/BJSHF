const requireOption = require('../common').requireOption;

/**
 * Get the comment for the :taskid task
 *  - if there is one, put it on res.tpl.comments
 */
module.exports = function(objectrepository) {
  var playlistModel = requireOption(objectrepository, 'playlistModel');

  return function(req, res, next) {
    console.log('getplaylistlist mw');
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
