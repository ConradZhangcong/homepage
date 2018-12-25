var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const favicon = require('serve-favicon');
const session = require('express-session');
const chalk = require('chalk');
const config = require('./config.default.js');

// routes
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 使用session中间件 session必须写在路由的上方
app.use(session({
  secret: 'secret',
  name: 'session',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}));

// favicon 标签的图标
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')))
// routes
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 增加端口监听,并且在启动后提示
app.listen(config.port, config.hostname, function () {
  const addr = `http://${config.hostname}:${config.port}`;
  console.log(`Service Start at ${chalk.green(addr)}`);
})

module.exports = app;