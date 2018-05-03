const requireOption = require("../common").requireOption;

/**
 * Get the comment for the :taskid task
 *  - if there is one, put it on res.tpl.comments
 */
module.exports = function(objectrepository) {
  var playlistModel = requireOption(objectrepository, "playlistModel");

  return function(req, res, next) {
    // console.log(req.params);
    playlistModel.find(
      {
        _owner: req.params.userid
      },
      (err, playlists) => {
        res.tpl.playlists = playlists;
        console.log(res.tpl.playlists);
        return next();
      }
    );
  };
};
