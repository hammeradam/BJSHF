const requireOption = require('../common').requireOption;

/**
 * Create (or update) playlist if we have the data for it
 * update if we have a res.tpl.playlist, create if we don't have
 *  - if everything is ok redirect to /playlist/:id
 */
module.exports = objectrepository => {
  let playlistModel = requireOption(objectrepository, 'playlistModel');

  return (req, res, next) => {
    console.log('updatePlaylistMW');
    if (
      typeof req.body.name === 'undefined' ||
      typeof req.body.description === 'undefined'
    ) {
      return next();
    }

    let playlist = undefined;
    if (typeof res.tpl.playlist !== 'undefined') {
      playlist = res.tpl.playlist;
    } else {
      playlist = new playlistModel();
    }
    playlist.name = req.body.name;
    playlist.desc = req.body.description;
    playlist._owner = req.session.userid;

    playlist.save((err, result) => {
      if (err) {
        return next(err);
      }

      return res.redirect('/playlist/' + result._id);
    });
  };
};
