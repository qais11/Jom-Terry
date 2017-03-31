const express = require('express');
const {json} = require('body-parser');
const cors = require('cors');
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('./config.js')
const port = 3000;
console.log(config.facebook.clientId);

const app = express();

app.use(express.static(__dirname + '/public/'))

app.use(json());
app.use(cors())
app.use(session({ secret: config.sessionSecret }));
app.use(passport.initialize())
app.use(passport.session())

passport.use(new FacebookStrategy({
  clientID: config.facebook.clientId,
  clientSecret: config.facebook.clientSecret,
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
  return done(null, profile);
}));


passport.serializeUser(function(user, done) {
  return done(null, user);
})

passport.deserializeUser(function(user, done) {
  return done(null, user);
})

//END POINTS

app.get('/auth/facebook', passport.authenticate('facebook'))
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/#!/welcome',failureRedirect:'/'
})
)
app.get("/me", function(req,res) {
	res.status(200).send(req.user);
})









app.listen(port , () => {
  console.log(`listenin' to prot ${port}`);
});
