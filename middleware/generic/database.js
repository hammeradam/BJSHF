const requireOption = require('../common').requireOption;

/**
 * Initializes the database
 */
module.exports = objectrepository => {
  let playlistModel = requireOption(objectrepository, 'playlistModel');
  let songModel = requireOption(objectrepository, 'songModel');
  let userModel = requireOption(objectrepository, 'userModel');

  return (req, res, next) => {
    console.log('databaseMW');
    playlistModel.remove({}, err => console.log(err));
    songModel.remove({}, err => console.log(err));
    userModel.remove({}, err => console.log(err));

    let user = new userModel();
    user.username = 'test';
    user.email = 'test@test.test';
    user.password = 'test';

    user.save((err, result) => {
      if (err) {
        return next(err);
      }
    });

    userModel
      .findOne({
        username: user.username
      })
      .exec((err, result) => {
        user.id = result;
      });

    let playlist1 = new playlistModel();
    playlist1.name = 'Playlist One';
    playlist1.desc =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non ex ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam id ex ut quam bibendum ultricies ac non turpis.';
    playlist1._owner = user.id;

    playlist1.save((err, result) => {
      if (err) {
        return next(err);
      }
    });

    let playlist2 = new playlistModel();
    playlist2.name = 'Playlist Two';
    playlist2.desc =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non ex ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam id ex ut quam bibendum ultricies ac non turpis.';
    playlist2._owner = user.id;

    playlist2.save((err, result) => {
      if (err) {
        return next(err);
      }
    });

    let playlist3 = new playlistModel();
    playlist3.name = 'Playlist Three';
    playlist3.desc =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non ex ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam id ex ut quam bibendum ultricies ac non turpis.';
    playlist3._owner = user.id;

    playlist3.save((err, result) => {
      if (err) {
        return next(err);
      }
    });

    playlistModel
      .findOne({
        name: playlist1.name
      })
      .exec((err, result) => {
        playlist1.id = result;
      });

    let song1 = new songModel();
    song1.title = 'Praise You';
    song1.artist = 'Fatboy Slim';
    song1._playlist = playlist1.id;
    song1.youtube = 'https://www.youtube.com/watch?v=Ex1qzIggZnA';
    song1.spotify = 'https://www.spotify.com/';

    song1.save((err, result) => {
      if (err) {
        return next(err);
      }
    });

    let song2 = new songModel();
    song2.title = 'Marling';
    song2.artist = 'Fid Mella';
    song2._playlist = playlist1.id;
    song2.youtube = 'https://www.youtube.com/watch?v=Ex1qzIggZnA';
    song2.spotify = 'https://www.spotify.com/';

    song2.save((err, result) => {
      if (err) {
        return next(err);
      }
    });

    let song3 = new songModel();
    song3.title = 'Blackbird';
    song3.artist = 'Nico Push';
    song3._playlist = playlist1.id;
    song3.youtube = 'https://www.youtube.com/watch?v=xeX1x8wlkjE';
    song3.spotify = 'https://www.spotify.com/';

    song3.save((err, result) => {
      if (err) {
        return next(err);
      }
    });

    return next();
  };
};
