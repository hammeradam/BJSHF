/**
 * If the user is not logged in, redirects to /
 */
module.exports = objectrepository => {
  return (req, res, next) => {
    console.log('authMW');
    if (typeof req.session.userid === 'undefined') {
      return res.redirect('/');
    }

    // For later use in ejs
    res.tpl.loggedInUserId = req.session.userid;
    // res.tpl.user = [];
    return next();
  };
};
