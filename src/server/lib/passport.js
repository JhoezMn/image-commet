const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../../controllers/models/users');
const helpers = require('./helpers');
const md5 = require('md5');

passport.use('local.signin', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    }, 
    async (req, username, password, done) => {
    const rows = await Users.find({ "username": username });        
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password)
        if (validPassword) {                      
          done(null, user, req.flash('success', 'Bienvenido '+ user.username));
        } else {
          done(null, false, req.flash('message', 'Clave incorrecto'));
        }
    } else {
        return done(null, false, req.flash('message', 'El usuario no existe.'));
    }
}));

passport.use('local.signup', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    }, 
    async ( req, username, password, done ) => {
    const { fullname, email } = req.body;   
    const c_user = await Users.findOne({ username: username });
    
    if(c_user){
        return done(null, false, req.flash('message', 'Usuario ya existe!'));

    } else {           
      password = await helpers.encryptPassword( password );
      const gravatar = md5(email);  
      // Saving in the Database
      const newUsers = new Users({
          gravatar,
          fullname,
          username,
          password,
          email
      });                
      await newUsers.save();
      done( null, newUsers );
    }
  }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows =await Users.find({ "_id": id });          
    done(null, rows[0]);
});