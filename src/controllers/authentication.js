const passport = require('passport');
require('../server/lib/passport');

const ctrl = {};

// SIGNUP
ctrl.signupget = (req, res) => {
  res.render('auth/signup');
};

// SINGIN
ctrl.singinget = (req, res) => {
  res.render('auth/signin');
};

ctrl.logout = (req, res) => {
  req.logOut();
  res.redirect('/');
};

ctrl.profile = (req, res) => {
  res.render('profile');
};

ctrl.signinpost = passport.authenticate('local.signin', {  
  successRedirect: '/profile',
  failureRedirect: '/signin',
  passReqToCallback: true  
});

ctrl.signuppost = passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
});

module.exports = ctrl;