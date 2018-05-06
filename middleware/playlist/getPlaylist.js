const requireOption = require("../common").requireOption;

/**
 * Get the task for the taskid param
 *  - if there is no such task, redirect to /tasks
 *  - if there is one, put it on res.tpl.task
 */
module.exports = objectrepository => {
  let playlistModel = requireOption(objectrepository, "playlistModel");

  return (req, res, next) => {
    console.log("get playlist mw. Playlsid: " + JSON.stringify(req.params));
    playlistModel
      .findOne({
        _id: req.params.playlistid
      })
      .exec((err, result) => {
        if (err || !result) {
          console.log("playlist find error: " + err);
          return res.redirect("/profile");
        }
        console.log(result);
        res.tpl.playlist = result;
        return next();
      });
  };
};
