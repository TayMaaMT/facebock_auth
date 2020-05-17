const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const facebookeStrategy = require('passport-facebook');

app.use(bodyParser.json());

const FACEBOOK_APP_ID = '';
const FACEBOOK_APP_SECRET = '';


app.use(session({
    secret: 'taymaa developer',
    resave: true,
    saveUninitialized: true
}));


const fbOpt = {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    profileFields: ["id", "displayName", "email"],
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
};

const fbCallback = function(accessToken, refreshToken, profile, cb) {
    console.log(profile._json);
    cb(null, profile._json);
}


passport.use(new facebookeStrategy(fbOpt, fbCallback));

app.route('/').get(passport.authenticate('facebook'))

app.route('/auth/facebook/callback').get(passport.authenticate('facebook', function(err, req, info) {
    const m = req.id
    console.log(m);
}), (req, res) => {
    console.log(req.user);
})

app.listen(3000);