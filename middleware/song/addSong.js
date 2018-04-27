const Song = require('../models/song');

module.exports = (req, res, next) => {
  if (typeof req.body.title === 'undefined') {
    return next();
  }

  let song = new Song();
  song.title = req.body.title;
  song.artist = req.body.artist;

  task.save((err, result) => {
    if (err) {
      return next(err);
    }

    return res.redirect('/task/' + result.id);
  });
};
