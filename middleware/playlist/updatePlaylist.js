const requireOption = require("../common").requireOption;

/**
 * Create (or update) task if we have the data for it
 * update if we have a res.tpl.task, create if we don't have
 *  - if there is no title, set tpl.error
 *  - if everything is ok redirect to /task/:id
 */
module.exports = objectrepository => {
  let playlistModel = requireOption(objectrepository, "playlistModel");

  return (req, res, next) => {
    console.log(req.body);
    if (
      typeof req.body.name === "undefined" ||
      typeof req.body.description === "undefined"
    ) {
      return next();
    }

    let playlist = undefined;
    if (typeof res.tpl.playlist !== "undefined") {
      playlist = res.tpl.playlist;
    } else {
      playlist = new playlistModel();
    }
    playlist.name = req.body.name;
    playlist.desc = req.body.description;

    console.log(req.session.userid);
    playlist._owner = req.session.userid;
    // playlist.tags = req.body.tags.split(",");

    playlist.save((err, result) => {
      if (err) {
        return next(err);
      }

      return res.redirect("/playlist/" + result._id);
    });
  };
};
