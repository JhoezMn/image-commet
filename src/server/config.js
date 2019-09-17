const express = require('express');
const morgan = require('morgan');
const path = require('path');
const multer = require('multer');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const routes = require('../routes');


module.exports = app => {

  // Settings
  app.set('port', process.env.PORT || 5000);
  app.set('views', path.join(__dirname, '../views'));
  app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    helpers: require('./lib/helpers'),
    extname: '.hbs'
  }));
  app.set('view engine', '.hbs');
  

  // middlewares
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
  app.use(session({
    secret: 'websubeimagen',
    resave: false,
    saveUninitialized: false   
  }));     
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(multer({
    dest: path.join(__dirname, '../public/upload/temp')
}).single('image'));

  // Global variables
  app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
  });
  
  // Routes
  routes(app);  
  
  // Static files
  app.use('/public', express.static(path.join(__dirname, '../public')));

  // Error Handling
  if('development' === app.get('env')) {
    app.use(errorHandler());
  }

  return app;

};
