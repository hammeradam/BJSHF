/**
 * Logout
 */
module.exports = objectrepository => {
  return (req, res, next) => {
    console.log('logoutMW');
    req.session.destroy(err => {
      return next();
    });
  };
};
