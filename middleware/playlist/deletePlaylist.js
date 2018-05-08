/**
 * Delete the playlist object, if its already loaded
 */
module.exports = function(objectrepository) {
  return function(req, res, next) {
    console.log('deletePlaylistMW');
    if (typeof res.tpl.playlist === 'undefined') {
      return next();
    }

    res.tpl.playlist.remove(function(err) {
      if (err) {
        return next(err);
      }

      res.redirect('/profile');
    });
  };
};
