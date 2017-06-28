var express = require('express')
var hbs = require('express-hbs')
var firebase = require('firebase')
var dotenv = require('dotenv').config()
var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var app = express()

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
	apiKey: process.env.firebaseKey,
	authDomain: process.env.firebaseDomain,
	databaseURL: process.env.firebaseDb,
	storageBucket: process.env.firebaseBucket
};
firebase.initializeApp(config);

var db = firebase.database();

app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'));
app.engine('hbs', hbs.express4({  
  defaultLayout: __dirname + '/views/layouts/layout.hbs',
  partialsDir: __dirname + '/views/partials',
  layoutsDir: __dirname + '/views/layouts'
}));

passport.use(new GoogleStrategy({
    clientID: process.env.googleKey + ".apps.googleusercontent.com",
    clientSecret: process.env.googleSecret,
    callbackURL: process.env.domain + '/login/google/auth'
  },
  function(accessToken, refreshToken, profile, cb) {
    // Check user is part of ethode
    console.log(profile);
    if ((profile.emails[0].value).match("^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(ethode)\.com$")) {
      // Find or create new user if they don't exist
      console.log(profile.emails[0].value, "is from the ethode organization. Attempting to find/create user.");
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    } else {
      user = null;
      err = "User is not from ethode organization!";
    }
    return cb(err, user);
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


app.get('/status', function (req, res) {
  res.send('Hello World!')
})

app.get('/', function(req, res) {
	res.render('index')
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/login/google/auth',
  passport.authenticate('google', { failureRedirect: '/login', successRedirect: '/dashboard' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.session.authenticated = true;
  });

app.get('/logout', function(req, res){
  req.logout();
  // mark the user as logged out for auth purposes
  req.session.authenticated = false;
  res.redirect('/');
})

app.listen(3000, function () {
  console.log('Lunch & Learn App listening on port 3000!')
})