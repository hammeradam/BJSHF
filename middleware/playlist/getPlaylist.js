let requireOption = require('../common').requireOption;

/**
 * Get the task for the taskid param
 *  - if there is no such task, redirect to /tasks
 *  - if there is one, put it on res.tpl.task
 */
module.exports = function(objectrepository) {
  var playlistModel = requireOption(objectrepository, 'playlistModel');

  return function(req, res, next) {
    console.log(req.params.playlistid);
    playlistModel
      .findOne({
        _id: req.body.playlistid
      })
      .populate('_songs')
      .populate('_owner')
      .exec(function(err, result) {
        if (err || !result) {
          return res.redirect('/playlists');
        }

        res.tpl.songs = result;
        return next();
      });
  };
};
