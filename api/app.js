const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connectFlash = require('connect-flash');
const logger = require('morgan');
const passport = require('passport');
const router = require('./routes')

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret_passcode'));
app.use(session({
  secret: 'secret_passcode',
  cookie: {
    maxAge: 60 * 60 * 24 * 30
  },
  resave: false,
  saveUninitialized: false
}));
app.use(connectFlash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use('/', router);

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

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
