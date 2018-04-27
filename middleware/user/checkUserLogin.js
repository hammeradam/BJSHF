const requireOption = require('../common').requireOption;

/**
 * This middleware loads the user from model and checks the credentials,
 * if they are ok, set session values and redirect to /
 * if they are wrong, set error message
 */
module.exports = objectrepository => {
  let userModel = requireOption(objectrepository, 'userModel');

  return (req, res, next) => {
    //not enough parameter
    if (
      typeof req.body === 'undefined' ||
      typeof req.body.email === 'undefined' ||
      typeof req.body.password === 'undefined'
    ) {
      return next();
    }

    //lets find the user
    userModel.findOne(
      {
        email: req.body.email
      },
      (err, result) => {
        if (err || !result) {
          res.tpl.error.push('Your email address is not registered!');
          console.log('nincs user');
          return next();
        }

        console.log(req.body);
        //check password
        if (result.password !== req.body.password) {
          res.tpl.error.push('Wrong password!');
          console.log('rossz jelszo');
          return next();
        }

        console.log('match');
        //login is ok, save id to session
        req.session.userid = result._id;

        //redirect to / so the app can decide where to go next
        return res.redirect('/profile/' + req.session.userid);
      }
    );
  };
};
