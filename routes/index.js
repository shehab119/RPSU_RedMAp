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


var User = require('../models/user');

function ensureAuthenticated(req,res,next){
if(req.isAuthenticated()){
  return next();
}else{
  res.redirect('/users/login');
}
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET home page. */
router.get('/dashboard', ensureAuthenticated, function(req, res) {

  res.render('dashboard');
});


/* GET home page. */
router.get('/levels',function(req, res,next) {

  res.render('levels');
});


/* GET home page. */
router.get('/content_L1',function(req, res,next) {
 
  res.render('content_L1');
});

router.post('/content_L1', function(req, res, next) {
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;

    console.log(req.body);


  res.render('content_L1_ans', {q1, q2, q3, q4, q5});
});

/* GET home page. */
router.get('/main_quiz_1', function(req, res, next) {

  res.render('main_quiz_1');
});
router.get('/level_2', function(req, res,next) {

  res.render('level_2');
});

router.post('/main_quiz_1', function(req, res, next) {
  var m1 = req.body.m1;
  var m2 = req.body.m2;
  var m3 = req.body.m3;
  var m4 = req.body.m4;
  var m5 = req.body.m5;
  var m6 = req.body.m6;
  var m7 = req.body.m7;
  var m8 = req.body.m8;
  var m9 = req.body.m9;
  var m10 = req.body.m10;

    console.log(req.body);

    /*if(m1 == 400 && m2 == 225 && m3 == 950 && m4 == 600 && m5 == 507 && m6 == 240 && m7 == 255 && m8 == 220 && m9 == 265 && m10 == 255) {
      res.send('passed!');
    }*/

    if(m1 == 400 && m2 == 255 && m3 == 950 && m4 == 600 && m5 == 507 && m6 == 240 && m7 == 255 && m8 == 220 && m9 == 265 && m10 == 255) {

      res.redirect('/level_2');
    } else {
      res.render('main_quiz_1_error');
    }
});

// Level 2
router.get('/content_L2',function(req, res,next) {

  res.render('content_L2');
});

router.post('/content_L2', function(req, res, next) {
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;

    console.log(req.body);


  res.render('content_L2_ans', {q1, q2, q3, q4, q5});
});

// Main Quiz 2
router.get('/main_quiz_2',  function(req, res,next) {
 
  res.render('main_quiz_2');
});


router.post('/main_quiz_2', function(req, res, next) {
  var n1 = req.body.n1;
  var n2 = req.body.n2;
  var n3 = req.body.n3;
  var n4 = req.body.n4;
  var n5 = req.body.n5;
  var n6 = req.body.n6;
  var n7 = req.body.n7;
  var n8 = req.body.n8;
  var n9 = req.body.n9;
  var n10 = req.body.n10;

    console.log(req.body);

    /*if(m1 == 400 && m2 == 225 && m3 == 950 && m4 == 600 && m5 == 507 && m6 == 240 && m7 == 255 && m8 == 220 && m9 == 265 && m10 == 255) {
      res.send('passed!');
    }*/

    if(n1 == 0 && n2 == 35 && n3 == 250 && n4 == 400 && n5 == 300 && n6 == 200 && n7 == 485 && n8 == 10 && n9 == 215 && n10 == 295) {
    
      res.redirect('/level_3');
    } else {
      res.render('main_quiz_2_error');
      //res.redirect('/level_3');
    }
});

router.get('/level_3',function(req, res,next) {

  
  
  res.render('level_3');
});
// ########################################################################
// Dashboard success
router.get('/dashboard_success',function(req, res,next) {
  
  var username=username;

  res.render('dashboard_success', {name:username});
});
// ########################################################################

//PSC REG Routes
router.get('/psc_reg', function(req, res,next) {
  
  var username=username;

  res.render('psc_reg', {name:username});
});
router.post('/psc_reg', function(req, res, next) {
  

  res.redirect('/done_reg');
});
//Done_reg Routes
router.get('/done_reg',function(req, res,next) {
  
  var username=username;

  res.render('done_reg', {name:username});
});



module.exports = router;
