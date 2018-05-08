/**
 * This middleware has one purpose, when the user visits the / main page,
 * should be redirected to
 *    - /login when not signed in
 *    - /profile when signed in
 */
module.exports = objectrepository => {
  return (req, res, next) => {
    console.log('mainRedirectMW');
    if (typeof req.session.userid === 'undefined') {
      return res.redirect('/login');
    } else {
      return res.redirect('/profile');
    }
  };
};
