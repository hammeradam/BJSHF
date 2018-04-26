const requireOption = require('../common').requireOption;

module.exports = function(objectrepository) {
  var songModel = requireOption(objectrepository, 'songModel');

  return function(req, res, next) {
    songModel
      .findOne({
        _id: req.param('songid')
      })
      .populate('_assignedto')
      .exec(function(err, result) {
        if (err || !result) {
          return res.redirect('/tasks');
        }

        res.tpl.task = result;
        return next();
      });
  };
};
