const requireOption = require('../common').requireOption;

/**
 * Load a user (if exists) with the :userid param
 * and put it on res.tpl.user
 */
module.exports = objectrepository => {
  let userModel = requireOption(objectrepository, 'userModel');

  return (req, res, next) => {
    console.log('getownprofileMW');

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
