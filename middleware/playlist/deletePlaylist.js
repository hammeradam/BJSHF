/**
 * Delete the playlist object, if its already loaded
 * if its not the loggen in users playlist it calls next
 */
module.exports = function(objectrepository) {
  return function(req, res, next) {
    console.log('deletePlaylistMW');
    if (
      typeof res.tpl.playlist === 'undefined' ||
      req.session.userid !== res.tpl.playlist._owner.toString()
    ) {
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
