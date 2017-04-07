const express = require('express');
const {json} = require('body-parser');
const cors = require('cors');
const session = require('express-session')
const massive = require('massive')
const db = require('./db')
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
}, function (token, refreshToken, profile, done) {
  db.findUser(profile.id, function(err, users) {
    if (err) next(err)
    if (users.length) {
      return done(null, users[0]);
    }
    db.createUser([profile.displayName, profile.id], function(err, newUsers) {
      console.log(newUsers)
      return done(null, newUsers[0])
    })
  })

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
  successRedirect: "/#!/welcome" ,failureRedirect:'/'
})
)
app.get("/getCurrentUser",(req,res)=>{
	res.status(200).send(req.user);
})

app.get('/getHighScore',(req, res, next)=> {
  if (!req.user) req.user = {id: 3}
  db.getHighScore([req.user.id], (err, highScores) =>{
    if (err) {
      return next(err)
    }
    return res.status(200).send(highScores[0])
  })
})
app.post('/updateHighScore', (req, res, next)=>{
  console.log(req.body.score);
  if (!req.user) req.user = {id: 3}
  db.update_high_score([req.user.id, parseInt(req.body.score)],(err, score)=>{
    if (err){
      return next(err)
    }

    else{
    res.status(200).json(score);
  }
  })
})





app.listen(port , () => {
  console.log(`listenin' to prot ${port}`);
});

module.exports = app
