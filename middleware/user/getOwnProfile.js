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
    // console.log(req.session);
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

      res.tpl.user = result;
      res.tpl.id = req.session.userid;
      // console.log('result: ' + result);
      return next();
    });
  };
};
