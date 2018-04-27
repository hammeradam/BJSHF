const requireOption = require('../common').requireOption;

module.exports = objectrepository => {
  let songModel = requireOption(objectrepository, 'songModel');

  return (req, res, next) => {
    songModel
      .findOne({
        _id: req.param('songid')
      })
      .populate('_assignedto')
      .exec((err, result) => {
        if (err || !result) {
          return res.redirect('/tasks');
        }

        res.tpl.task = result;
        return next();
      });
  };
};
