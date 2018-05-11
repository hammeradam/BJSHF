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

    let user1 = makeUser('Aladár', 'test@test.test', 'test');
    let user2 = makeUser('Béla', 'bela@gmail.com', 'jelszo');
    let user3 = makeUser('Cecil', 'cecil@gmail.com', 'jelszo');
    let user4 = makeUser('Dénes', 'denes@gmail.com', 'jelszo');
    let user5 = makeUser('Elemér', 'elemer@gmail.com', 'jelszo');
    let user6 = makeUser('hammeradam', 'regelosemailcim@gmail.com', 'jelszo');

    const desc =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non ex ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam id ex ut quam bibendum ultricies ac non turpis.';

    // User 1
    let playlist1 = makePlaylist('Playlist One', desc, user1);
    let playlist2 = makePlaylist('Playlist Two', desc, user1);
    let playlist3 = makePlaylist('Playlist Three', desc, user1);

    let song1 = makeSong(
      'Praise You',
      'Fatboy Slim',
      'https://www.youtube.com/watch?v=Ex1qzIggZnA',
      'https://open.spotify.com/track/2auqHGPYKXr5fnHRWKliRi',
      playlist1
    );
    let song2 = makeSong(
      'Marling',
      'Fid Mella',
      'https://www.youtube.com/watch?v=CeGB-y5isoQ',
      'https://open.spotify.com/track/1COemjYqTAB1bZvRX0EtVh',
      playlist1
    );
    let song3 = makeSong(
      'Blackbird',
      'Nico Push',
      'https://www.youtube.com/watch?v=xeX1x8wlkjE',
      'https://open.spotify.com/track/6nvlvmztDG0S5Z5WRPuuDR',
      playlist1
    );
    // End of User 1

    // User 2
    let playlist4 = makePlaylist('Playlist Four', desc, user2);
    let playlist5 = makePlaylist('Playlist Five', desc, user2);
    let playlist6 = makePlaylist('Playlist Six', desc, user2);

    let song4 = makeSong(
      'Palms',
      'Quixotic',
      'https://www.youtube.com/watch?v=mv1XUyRqcGU',
      'https://open.spotify.com/track/1DshPiRbHlhEz3ZVnMANAk',
      playlist4
    );
    let song5 = makeSong(
      'Materialism',
      'LTR',
      'https://www.youtube.com/watch?v=LsEpkNoLhIA',
      'https://open.spotify.com/track/7whpJCMiIrC8SWngsHJWq1',
      playlist4
    );
    let song6 = makeSong(
      'The Eponym',
      'Chill Bump',
      'https://www.youtube.com/watch?v=PlBTqsWJyas',
      'https://open.spotify.com/track/5xRoZqrP6dueYhZy5EW9jK',
      playlist4
    );
    // End of User 2
    return next();
  };

  function makeUser(name, email, password) {
    let user = new userModel();
    user.username = name;
    user.email = email;
    user.password = password;

    user.save((err, result) => {
      if (err) {
        return next(err);
      }
    });

    return user;
  }

  function makePlaylist(name, desc, owner) {
    let playlist = new playlistModel();
    playlist.name = name;
    playlist.desc = desc;
    playlist._owner = owner._id;

    playlist.save((err, result) => {
      if (err) {
        return next(err);
      }
    });

    return playlist;
  }

  function makeSong(title, artist, youtube, spotify, playlist) {
    let song = new songModel();
    song.title = title;
    song.artist = artist;
    song.youtube = youtube;
    song.spotify = spotify;
    song._playlist = playlist._id;

    song.save((err, result) => {
      if (err) {
        return next(err);
      }
    });

    return song;
  }
};
