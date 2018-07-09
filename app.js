var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const dotEnv = require('dotenv').config()

//npm install dotEnv
//uncomment line 8
//correct users.js

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var couponsRouter = require('./routes/coupons');

mongoose.connect('mongodb://admin:honeywell2018@ds233061.mlab.com:33061/vector-thunderstorm');

var app = express();

// allowing cors
app.use((req, res, next) => {
  res.header('Access-Controll-Allow-Origin', '*');
  res.header('Access-Controll-Allow-Headers', '*');
  if (req.method == 'OPTIONS') {
      res.header('Access-Controll-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/coupons', couponsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
