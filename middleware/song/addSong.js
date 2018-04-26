const Song = require('../models/song');

module.exports = function(req, res, next) {
  if (typeof req.body.title === 'undefined') {
    return next();
  }

  let song = new Song();
  song.title = req.body.title;
  song.artist = req.body.artist;

  task.save(function(err, result) {
    if (err) {
      return next(err);
    }

    return res.redirect('/task/' + result.id);
  });
};
