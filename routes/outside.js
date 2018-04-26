const mainRedirectMW = require('../middleware/generic/mainRedirect');
const inverseAuthMW = require('../middleware/generic/inverseAuth');
const checkUserLoginMW = require('../middleware/user/checkUserLogin');
const checkUserRegistrationMW = require('../middleware/user/checkUserRegistration');
const renderMW = require('../middleware/generic/render');
const authMW = require('../middleware/generic/auth');
const logoutMW = require('../middleware/generic/logout');

const userModel = require('../models/user');

module.exports = function(app) {
  var objectRepository = {
    userModel: userModel
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
  app.get('/logout', logoutMW(objectRepository), function(req, res, next) {
    res.redirect('/');
  });

  /**
   * Registration
   */
  app.use(
    '/register',
    inverseAuthMW(objectRepository),
    checkUserRegistrationMW(objectRepository),
    renderMW(objectRepository, 'register')
  );
};
