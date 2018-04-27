const requireOption = require('../common').requireOption;

/**
 * Load all the users
 * and put them on res.tpl.users
 */
module.exports = objectrepository => {
  let userModel = requireOption(objectrepository, 'userModel');

  return (req, res, next) => {
    //lets find the user
    userModel.find({}, (err, results) => {
      if (err) {
        return next(err);
      }

      res.tpl.users = results;

      return next();
    });
  };
};
