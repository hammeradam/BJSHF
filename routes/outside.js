const mainRedirectMW = require('../middleware/generic/mainRedirect');
const inverseAuthMW = require('../middleware/generic/inverseAuth');
const checkUserLoginMW = require('../middleware/user/checkUserLogin');
const checkUserRegistrationMW = require('../middleware/user/checkUserRegistration');
const renderMW = require('../middleware/generic/render');
const logoutMW = require('../middleware/generic/logout');
const databaseMW = require('../middleware/generic/database');

const userModel = require('../models/user');
const playlistModel = require('../models/playlist');
const songModel = require('../models/song');

module.exports = app => {
  let objectRepository = {
    userModel: userModel,
    playlistModel: playlistModel,
    songModel: songModel
  };

  /**
   * Main page
   */
  app.get('/', mainRedirectMW(objectRepository));

  /**
   * Login page
   */
  app.use(
    '/login',
    inverseAuthMW(objectRepository),
    checkUserLoginMW(objectRepository),
    renderMW(objectRepository, 'login')
  );

  /**
   * Main page
   */
  app.get('/logout', logoutMW(objectRepository), (req, res, next) =>
    res.redirect('/')
  );

  /**
   * Registration
   */
  app.use(
    '/register',
    inverseAuthMW(objectRepository),
    checkUserRegistrationMW(objectRepository),
    renderMW(objectRepository, 'register')
  );

  /**
   * Database initialization
   */
  app.get('/database', databaseMW(objectRepository), (req, res, next) =>
    res.redirect('/')
  );
};
