const nodemailer = require('nodemailer');
const requireOption = require('../common').requireOption;

/**
 * Sends forgotten pawwword to user
 */
module.exports = objectrepository => {
  let userModel = requireOption(objectrepository, 'userModel');

  return (req, res, next) => {
    console.log('sendPasswordMW');
    if (
      !req.body.forgottenemail ||
      req.body.forgottenemail === 'undefined' ||
      req.body.forgottenemail === null
    ) {
      return next();
    }
    userModel.findOne({ email: req.body.forgottenemail }, (err, result) => {
      if (err) {
        return next(err);
        console.log('no user with email: ' + req.body.forgottenemail);
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'felhasznalonevfoglalt89@gmail.com',
          pass: 'ezcsakegyteszt'
        }
      });

      const mailOptions = {
        from: 'LSTN',
        to: result.email,
        subject: 'Forgotten password',
        text: `Your password for the username ${result.username} is ${
          result.password
        }.`
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.redirect('/login');
    });
  };
};
