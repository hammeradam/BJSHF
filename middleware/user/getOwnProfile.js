var requireOption = require('../common').requireOption;

/**
 * Load a user (if exists) with the :userid param
 * and put it on res.tpl.user
 */
module.exports = function(objectrepository) {
  var userModel = requireOption(objectrepository, 'userModel');

  return function(req, res, next) {
    console.log('getownprofileMW');

    //not enought parameter
    console.log(req.session);
    if (
      typeof req.session.userid === 'undefined' ||
      req.session.userid === 'null'
    ) {
      return next();
    }

    //lets find the user
    userModel.findOne({ _id: req.session.userid }, function(err, result) {
      if (err) {
        return next(err);
      }

      res.tpl.user = result;
      res.tpl.id = req.session.userid;
      console.log('result: ' + result);
      return next();
    });
  };
};
