var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var port = process.env.PORT || 8080;
var home = require('./routes/home');
var signup = require('./routes/signup');
var authenticateUser = require('./routes/authenticate_user');
var memberInfo = require('./routes/memberinfo');

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log to console
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());
app.use(function(req, res, next) { 
res.header("Access-Control-Allow-Origin", "*"); 
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
next(); 
});
//routes
app.use('/', home);
app.use('/signup', signup);
app.use('/authenticate', authenticateUser);
app.use('/memberinfo', memberInfo);













// Start the server
app.listen(port);
console.log('There will be dragons: http://localhost:' + port);
