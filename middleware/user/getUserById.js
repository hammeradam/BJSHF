const requireOption = require('../common').requireOption;

module.exports = objectrepository => {
  let userModel = requireOption(objectrepository, 'userModel');

  return (req, res, next) => {
    console.log('getUserByIdMW');

    //not enought parameter
    if (
      typeof req.params.userid === 'undefined' ||
      req.params.userid === 'null'
    ) {
      if (req.session.userid) {
        userModel.findOne({ _id: req.session.userid }, (err, result) => {
          if (err) {
            return next(err);
          }

          res.tpl.user = result;
          res.tpl.id = req.session.userid;
          res.tpl.playlists = [];
        });
      }
      return next();
    }

    //lets find the user
    userModel.findOne({ _id: req.params.userid }, (err, result) => {
      if (err) {
        return next(err);
      }

      res.tpl.user = result;
      res.tpl.id = req.session.userid;
      return next();
    });
  };
};
