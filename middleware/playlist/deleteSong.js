const requireOption = require("../common").requireOption;
/**
 * Delete the song object
 */
module.exports = function(objectrepository) {
  let songModel = requireOption(objectrepository, "songModel");

  return function(req, res, next) {
    console.log("delete song mw");
    if (
      typeof req.params.songid === "undefined" ||
      req.params.songid === "null"
    ) {
      return next();
    }

    // console.log("songID: " + req.params.songid);
    songModel.findOne({ _id: req.params.songid }, (err, result) => {
      if (err) {
        return next(err);
      }

      // console.log("result: " + result);

      result.remove(function(err) {
        if (err) {
          return next(err);
        }

        res.redirect("/profile");
      });
    });
  };
};