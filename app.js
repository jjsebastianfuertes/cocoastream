require('dotenv').load();

//imports
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');


//mongoose connection 
require('./app_api/models/db');
require('./app_server/config/passport');


var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/usuarios');

var routesApi = require('./app_api/routes/index');
//let usersApi = require('./app_api/routes/users');



//instantiations
var app = express();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

});

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/', indexRouter);
//app.use('/', usersRouter);
app.use('/api', routesApi);
//app.use('/', routesApi)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler

app.use(function(err, req, res, nexr){
  if (err.name === 'UnauthorizedError'){
    res.status(401);
    res.json({"message": err.name +": "+ err.message});
  }
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
