const requireOption = require('../common').requireOption;

/**
 * Load a users own profile
 */
module.exports = objectrepository => {
  let userModel = requireOption(objectrepository, 'userModel');

  return (req, res, next) => {
    console.log('getOwnProfileMW');
    //not enought parameter
    if (
      typeof req.session.userid === 'undefined' ||
      req.session.userid === 'null'
    ) {
      return next();
    }

    //lets find the user
    userModel.findOne({ _id: req.session.userid }, (err, result) => {
      if (err) {
        return next(err);
      }

      res.tpl.userid = result._id;
      res.tpl.user = result;
      res.tpl.id = req.session.userid;
      res.tpl.playlists = [];
      return next();
    });
  };
};
