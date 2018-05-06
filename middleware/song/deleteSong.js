/**
 * Delete the song object, if its already loaded
 */
module.exports = function(objectrepository) {
  return function(req, res, next) {
    if (typeof res.tpl.song === "undefined") {
      return next();
    }

    res.tpl.song.remove(function(err) {
      if (err) {
        return next(err);
      }

      //redirect to all tasks
      res.redirect("/tasks/");
    });
  };
};
