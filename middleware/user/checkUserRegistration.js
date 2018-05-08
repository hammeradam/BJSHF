const requireOption = require('../common').requireOption;

/**
 * Check if the email address is already registered, if not
 * create the user (no extra checks on password)
 */
module.exports = objectrepository => {
  let UserModel = requireOption(objectrepository, 'userModel');

  return (req, res, next) => {
    console.log('checkUserRegistrationMW');
    //not enough parameter
    if (
      typeof req.body === 'undefined' ||
      typeof req.body.email === 'undefined' ||
      typeof req.body.password1 === 'undefined' ||
      typeof req.body.password2 === 'undefined'
    ) {
      return next();
    }

    //lets find the user
    UserModel.findOne(
      {
        email: req.body.email
      },
      (err, result) => {
        if (err || result !== null) {
          res.tpl.error.push('Your email address is already registered!');
          return next();
        }

        if (req.body.username.length < 3) {
          res.tpl.error.push('The username should be at least 3 characters!');
          return next();
        }

        if (req.body.password1 !== req.body.password2) {
          res.tpl.error.push('The passwords do not match!');
          return next();
        }

        //create user
        let newUser = new UserModel();
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.password = req.body.password1;
        newUser.save(err => {
          //redirect to /login
          return res.redirect('/login');
        });
      }
    );
  };
};
