/**
 * If the user is not logged in, redirects to /
 */
module.exports = objectrepository => {
  return (req, res, next) => {
    console.log('authMW');
    if (typeof req.session.userid === 'undefined') {
      return res.redirect('/');
    }
    return next();
  };
};
