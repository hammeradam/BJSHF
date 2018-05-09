const requireOption = require('../common').requireOption;

/**
 * Saves userid to res.tpl
 */
module.exports = objectrepository => {
  return (req, res, next) => {
    console.log('saveUserIdtoTplMW');

    res.tpl.loggedInUserId = req.session.userid;

    return next();
  };
};
