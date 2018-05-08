const requireOption = require('../common').requireOption;

/**
 * Get the task for the taskid param
 *  - if there is no such task, redirect to /tasks
 *  - if there is one, put it on res.tpl.task
 */
module.exports = objectrepository => {
  let playlistModel = requireOption(objectrepository, 'playlistModel');

  return (req, res, next) => {
    playlistModel
      .findOne({
        _id: req.params.playlistid
      })
      .exec((err, result) => {
        if (err || !result) {
          return res.redirect('/profile');
        }
        res.tpl.userid = req.session.userid;
        res.tpl.playlist = result;
        return next();
      });
  };
};
