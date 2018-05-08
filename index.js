const express = require('express');
const path = require('path');
const app = express();

const session = require('express-session');
const bodyParser = require('body-parser');

/**
 * Define view engine
 */
app.set('view engine', 'ejs');

/**
 * Static stuff
 */
app.use(express.static('public'));

/**
 * Session above all
 */
app.use(
  session({
    secret: 'szupertitkostitok',
    cookie: {
      maxAge: 600000
    },
    resave: true,
    saveUninitialized: false
  })
);

/**
 * Parse parameters in POST
 */
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

/**
 * Define the port to run on
 */
app.set('port', 4200);

/**
 * Creat the .tpl on the res object
 */
app.use('/', (req, res, next) => {
  res.tpl = {};
  res.tpl.error = [];

  return next();
});

/**
 * Include all the routes
 */
require('./routes/outside')(app);
require('./routes/playlist')(app);
require('./routes/profile')(app);

/**
 * Standard error handler
 */
app.use((err, req, res, next) => {
  res.status(500).send('Houston, we have a problem!');

  //Flush out the stack to the console
  console.error(err.stack);
});

// Listen for requests
let server = app.listen(app.get('port'), () => {
  console.log('App listening on port ' + server.address().port);
});

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
