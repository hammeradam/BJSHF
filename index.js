let express = require('express');
let path = require('path');
let app = express();

// Define the port to run on
app.set('port', 3000);
app.set('view engine', 'ejs');



app.use('/', (req, res, next) => {
  res.tpl = {};
  return next();
});

function load(req, res, next) {

}


/**
 * Include all the routes
 */
require('./routes/routes')(app);

app.use(express.static('public'));

//Routes
// '/' GET index.html main page
// '/login' GET login
// '/register' POST register
// '/forgotten' GET forgotten password
// '/profile' GET users own profile
// '/profile/:id' GET id persons profile
// '/playlist/:id' GET id playlist
// '/playlist/add' POST add playlist
// '/playlist/:id/delete' DELETE delete playlist
// '/playlist/:id/update' PUT update playlist

// Middlewares
// login: login
// auth: if the user is not logged in redirects to /
// ckeckPlaylistOwner: if the playlist belongs to the logged in user, allown updating it
// checkUserLogin: checks if the user is logged in
// logout: logs out the user
// render: renders the template given to it
// mainRedirect: this middleware has one purpose, when the user visits the / main page,
//                * should be redirected to
//                *    - /login when not signed in
//                *    - / when signed in
// getPlaylist: get the playlist
// deletePlaylist: delete the playlist
// updatePlaylist: update the playlist

// Listen for requests
let server = app.listen(app.get('port'), () => {
  let port = server.address().port;
  console.log('Magic happens on port ' + port);
});