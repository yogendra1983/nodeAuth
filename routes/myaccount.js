var express = require('express');
var router = express.Router();

router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('pages/dashboard', { title: ' My Dashboard', headActive: 'dashboard' });
});



function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/login');
}




module.exports = router;
