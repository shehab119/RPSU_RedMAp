    
var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session= require('express-session');
var expressValidator=require('express-validator');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose= require('mongoose');
var url=require('url');
var async = require('async');
var crypto=require('crypto');
var router = express.Router();

var expressValidator = require('express-validator');
router.use(expressValidator());
/* GET users listing. */

var User = require('../models/user');


function ensureAuthenticated(req,res,next){

  if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect('/users/login');
  }
};



/* GET users listing. */
router.get('/dashboard', function(req, res, next) {

  res.render('dashboard');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/login_err', function(req, res, next) {
  res.render('login_error');
});



router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/users/login_err',
    failureFlash: true
  }),
  function(req, res) {
     res.redirect('/users/dashboard');
  });

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  // Validation
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  console.log('------>    ' + username + '  ----->     ' + password);


  var errors = req.validationErrors();

  if (errors) {
    console.log(errors);
    res.render('signup', {
      errors: errors
    });
  } else {
    console.log('enter');

    User.find({
      username: username
    }, function(err, results) {
      if (err) return console.error(err);

      console.log(results);
      if (results.length > 0) {
        
        res.redirect('/users/signup');
        console.log('ok huh');
      } else {
        var newUser = new User({
          username: username,
          password: password
        });

        User.createUser(newUser, function(err, user) {
          if (err) throw err;
          console.log(user);
          console.log('these data is uploaded');
        });
        req.flash('success_msg', 'You are register and can now login');
        res.redirect('/users/dashboard');
        console.log('Passed');
      }
    });

  }

  //res.redirect('login');

});

router.get('/logout', function(req, res) {
  console.log('We are out of here');
  req.logout();

  req.flash('success_msg', 'You are logged out');

  res.redirect('/users/login');
});






passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, {
          message: 'Unknown User'
        });
      }

      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: 'Invalid password'
          });
        }
      });
    });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = router;