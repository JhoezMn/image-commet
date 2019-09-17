const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const image = require('../controllers/image');
const auth = require('../controllers/authentication');
const { isLoggedIn, isNotLoggedIn } = require('../server/lib/auth');


module.exports = app => {

  router.get('/', home.index);
  router.get('/profile', home.profile);
  router.get('/images/:image_id', image.index);
  router.get('/images_user/:image_id', image.image_user);
  router.post('/images', image.create);
  router.post('/images/:image_id/like', image.like);
  router.post('/images/:image_id/comment', image.comment);
  router.delete('/images/:image_id', image.remove);
  router.get('/users', home.users);
  router.post('/update', home.update);
  router.post('/password', home.password);

  // SIGNUP
  router.get('/signup', isNotLoggedIn, auth.signupget);
  router.get('/signin', isNotLoggedIn, auth.singinget);
  router.get('/logout', isLoggedIn, auth.logout);  
  router.get('/profile', isLoggedIn, auth.profile);
  router.post('/signup', isNotLoggedIn, auth.signuppost);
  router.post('/signin', isNotLoggedIn, auth.signinpost);

  app.use(router);
};
