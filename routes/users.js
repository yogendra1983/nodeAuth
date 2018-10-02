var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest:'./uploads'});
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

// database connection
require('../mongodb');

var User = require('../models/users');

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/


router.get('/login', function(req, res, next) {
  res.render('pages/login', { title: 'User Login Form', headActive: 'login' });
});

router.post('/login',
  passport.authenticate('local', {failureRedirect:'/users/login', failureFalsh: 'Invalid username or password'   }),
  function(req, res) {
   req.flash('success', 'You are now logged in'); 
   res.redirect('/account');
  });



// serialize User and deserialize User

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });




passport.use(new localStrategy(function(username, password, done){
  User.getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'Unknow User'});
      }
      // password compaire
      User.comparePassword(password, user.password, function(err, isMatch){
          if(err) return done(err);
          if(isMatch){
              return done(null, user);
          }else{
            return done(null, false, {message: 'Invalid Password'});
          }
      });



  });
}));

router.get('/register', function(req, res, next) {
  res.render('pages/registration', { title: 'Registration Form', headActive: 'registration' });
});




router.post('/register', upload.single('profileimage'), function(req, res, next) {

//  // req.flash('success', 'You are now registered and can login');
//   res.location('/');
//   res.redirect('/register');

console.log('hello yogendra');

});

router.get('/logout', function(req, res) {
  //console.log('hello');
  //res.send('hello yogendra');
  req.logout();
  req.flash('success', 'Yoy are now logged out');
  res.redirect('/users/login');
});










module.exports = router;
