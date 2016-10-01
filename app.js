require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
require('./app_api/models/db');
require('./app_api/config/passport');
var uglifyJs = require("uglify-js");
var fs = require('fs');
var routesApi = require('./app_api/routes');
var app = express();

var appClientFiles = [
  'app_client/app.js',
  'app_client/home/home.controller.js',
  'app_client/book/book.controller.js',
  'app_client/auth/login/login.controller.js',
  'app_client/auth/register/register.controller.js',
  'app_client/auth/profile/profile.controller.js',
  'app_client/auth/trades/trades.controller.js',
  'app_client/common/services/authentication.service.js',
  'app_client/common/services/googleSearch.service.js',
  'app_client//common/services/dbSearch.service.js',
  'app_client//common/filters/formatReview.filter.js',
  'app_client//common/filters/formatRequest.filter.js',
  'app_client//common/filters/formatTitle.filter.js',
  'app_client//common/filters/formatAuthor.filter.js',
  'app_client//common/filters/formatDescription.filter.js',
  'app_client//common/filters/formatOwner.filter.js',
  'app_client/common/directives/navigation/navigation.controller.js',
  'app_client/common/directives/navigation/navigation.directive.js',
  'app_client/common/directives/footer/footerGeneric.directive.js',
  'app_client/common/directives/pageHeader/pageHeader.directive.js'
];

var uglified = uglifyJs.minify(appClientFiles, { compress : false });

fs.writeFile('public/angular/bookstoreApp.min.js', uglified.code, function (err){
  if(err) {
    console.log(err);
  } else {
    console.log("Script generated and saved:", 'bookstoreApp.min.js');
  }
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

app.use(passport.initialize());

app.use('/api', routesApi);

app.set('view engine', 'jade');

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json("Login please...");
  } 
})

module.exports = app;
