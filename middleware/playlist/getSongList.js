const requireOption = require("../common").requireOption;

/**
 * Get the comment for the :taskid task
 *  - if there is one, put it on res.tpl.comments
 */
module.exports = function(objectrepository) {
  var songModel = requireOption(objectrepository, "songModel");

  return function(req, res, next) {
    // console.log(req.params);
    songModel.find(
      {
        _playlist: req.params.playlistid
      },
      (err, songs) => {
        res.tpl.songs = songs;
        // console.log(res.tpl.songs);
        return next();
      }
    );
  };
};
