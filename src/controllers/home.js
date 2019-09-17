const sidebar = require('./helpers/sidebar');
const { Image, Users } = require('./models');
const helpers = require('../server/lib/helpers');

const ctrl = {};

ctrl.index = async (req, res) => {  
  const images = await Image
    .find()
    .sort({ timestamp: -1 });
  let viewModel = { images: [] };
  viewModel.images = images;
  res.render('index', viewModel);
};

ctrl.profile = async (req, res) => {  
  const images = await Image
    .find()
    .sort({ timestamp: -1 });
  let viewModel = { images: [] };
  viewModel.images = images;
  viewModel = await sidebar(viewModel);  
  res.render('profile', viewModel);
};

ctrl.users = async (req, res) => {  
  const images = await Image
    .find({ user_id: req.user._id })
    .sort({ timestamp: -1 });
  let viewModel = { images: [] };
  viewModel.images = images;
  viewModel = await sidebar(viewModel);
  res.render('user', viewModel);
};

ctrl.update = async (req, res) => {    
  await Users.update({
    _id: req.user._id, 
    $set:{ 
      username: req.body.username,
      fullname: req.body.fullname,
      email: req.body.email
    }  
  });
  res.redirect('/users');
};

ctrl.password = async (req, res) => {   
  const validPassword = await helpers.matchPassword(req.body.old, req.user.password)
  if (validPassword) { 
    if(req.body.new == req.body.confirm) {
      await Users.update({
        _id: req.user._id, 
        $set:{       
          email: req.body.new
        }  
      });    
    } else {
      req.flash('message', 'No coincide la nueva contraseña!');
    }
  } else {
    req.flash('message', 'Contraseña anterior incorrecta!');
  }
  res.redirect('/users');
};

module.exports = ctrl;
